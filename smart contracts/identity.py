from algopy import ARC4Contract, arc4, Txn, Account, Bytes, String

class Identity(ARC4Contract):
    """
    Player Identity Smart Contract
    Stores player usernames, NFDs, and profile images in local state.
    """

    @arc4.abimethod
    def register(self, username: String, nfd_name: String, profile_image: String):
        existing = self.local_state(Txn.sender).get(Bytes("username"))
        assert not existing.exists, "Profile already exists"

        self.local_state(Txn.sender).put(Bytes("username"), username.bytes())
        self.local_state(Txn.sender).put(Bytes("nfd"), nfd_name.bytes())
        self.local_state(Txn.sender).put(Bytes("image"), profile_image.bytes())

    @arc4.abimethod
    def update_profile(self, username: String, nfd_name: String, profile_image: String):
        existing = self.local_state(Txn.sender).get(Bytes("username"))
        assert existing.exists, "Profile not found"

        self.local_state(Txn.sender).put(Bytes("username"), username.bytes())
        self.local_state(Txn.sender).put(Bytes("nfd"), nfd_name.bytes())
        self.local_state(Txn.sender).put(Bytes("image"), profile_image.bytes())

    @arc4.abimethod
    def delete_profile(self):
        username = self.local_state(Txn.sender).get(Bytes("username"))
        assert username.exists, "Profile not found"

        self.local_state(Txn.sender).delete(Bytes("username"))
        self.local_state(Txn.sender).delete(Bytes("nfd"))
        self.local_state(Txn.sender).delete(Bytes("image"))

    @arc4.abimethod(readonly=True)
    def get_profile(self, player: Account) -> arc4.Tuple3[String, String, String]:
        username = self.local_state(player).get(Bytes("username"))
        assert username.exists, "Profile not found"

        nfd = self.local_state(player).get(Bytes("nfd"))
        image = self.local_state(player).get(Bytes("image"))

        uname_str = String.from_bytes(username.value)
        nfd_str = String.from_bytes(nfd.value if nfd.exists else Bytes(""))
        image_str = String.from_bytes(image.value if image.exists else Bytes(""))

        return (uname_str, nfd_str, image_str)
