from algopy import ARC4Contract, arc4, Txn, Account, Bytes, UInt64, itxn

class Reward(ARC4Contract):

    @arc4.abimethod
    def set_backend(self, backend: Account):
        self.state.backend = backend

    @arc4.abimethod
    def set_treasury(self, treasury: Account):
        self.state.treasury = treasury

    @arc4.abimethod
    def claim_reward(self, player: Account, score: UInt64, proof: Bytes):
        backend = self.state.backend
        assert backend != Bytes.zero(32), "Backend not set"

        message = player.bytes() + score.bytes()
        verified = arc4.ed25519verify(message, proof, backend.bytes())
        assert verified, "Invalid or tampered proof"

        last_score = self.local_state(player).get(Bytes("last_score"))
        if last_score.exists:
            assert score > UInt64.from_bytes(last_score.value), "Duplicate or lower score"
        self.local_state(player).put(Bytes("last_score"), score.bytes())

        reward_amount = score // UInt64(100)
        assert self.state.treasury != Bytes.zero(32), "Treasury not set"

        itxn.Payment(
            receiver=player.bytes(),
            amount=reward_amount
        ).submit()

    @arc4.abimethod(readonly=True)
    def get_last_score(self, player: Account) -> UInt64:
        last_score = self.local_state(player).get(Bytes("last_score"))
        if last_score.exists:
            return UInt64.from_bytes(last_score.value)
        else:
            return UInt64(0)
