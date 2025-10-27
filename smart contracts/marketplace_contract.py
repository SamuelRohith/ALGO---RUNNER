from algopy import ARC4Contract, arc4, itxn, Global, Txn, Gtxn, UInt64, Bytes, Account, Box

class Marketplace(ARC4Contract):
    LISTING_PREFIX = Bytes("listing:")

    def _box_key(self, asset_id: UInt64) -> Bytes:
        return self.LISTING_PREFIX + asset_id.bytes()

    @arc4.abimethod
    def set_treasury(self, treasury: Account):
        self.state.put(Bytes("treasury"), treasury.bytes())

    @arc4.abimethod
    def create_listing(self, asset_id: UInt64, price: UInt64):
        assert price > 0, "Price must be greater than zero"
        key = self._box_key(asset_id)
        value = Txn.sender.bytes() + price.bytes()
        Box.put(key, value)

    @arc4.abimethod
    def cancel_listing(self, asset_id: UInt64):
        key = self._box_key(asset_id)
        listing = Box.get(key)
        assert listing.exists, "Listing not found"
        seller = listing.value[:32]
        assert seller == Txn.sender.bytes(), "Only the seller can cancel"
        Box.delete(key)

    @arc4.abimethod
    def purchase(self, asset_id: UInt64):
        key = self._box_key(asset_id)
        listing = Box.get(key)
        assert listing.exists, "Listing not found"
        seller = listing.value[:32]
        price = UInt64.from_bytes(listing.value[32:40])
        assert Txn.sender.bytes() != seller, "Seller cannot buy own item"
        pay_txn = Gtxn[Txn.group_index - 1]
        assert pay_txn.amount >= price, "Payment amount too low"
        assert pay_txn.receiver.bytes() == Global.current_application_address().bytes(), "Payment must go to app escrow"
        itxn.AssetTransfer(
            asset_id=asset_id,
            sender=Account.from_bytes(seller),
            receiver=Txn.sender,
            amount=1,
        ).submit()
        fee = price // UInt64(100)
        seller_amount = price - fee
        itxn.Payment(receiver=Account.from_bytes(seller), amount=seller_amount).submit()
        treasury_bytes = self.state.get(Bytes("treasury"))
        if treasury_bytes.exists:
            itxn.Payment(receiver=Account.from_bytes(treasury_bytes.value), amount=fee).submit()
        Box.delete(key)

    @arc4.abimethod(readonly=True)
    def get_listing(self, asset_id: UInt64) -> arc4.Tuple2[Account, UInt64]:
        key = self._box_key(asset_id)
        listing = Box.get(key)
        assert listing.exists, "Listing not found"
        seller = Account.from_bytes(listing.value[:32])
        price = UInt64.from_bytes(listing.value[32:40])
        return (seller, price)
