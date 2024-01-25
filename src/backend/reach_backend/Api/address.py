"""Module defining a custom address implementation."""


class Address:
    """Address class."""

    def __init__(self, street="", number=0, city="", postal_code="", province=""):
        """Initialize a new address."""
        self.street = street
        self.number = number
        self.province = province
        self.city = city
        self.postal_code = postal_code

    def to_dict(self):
        """Convert an address object to a dictionary format."""
        return {
            "street": self.street,
            "number": self.number,
            "city": self.city,
            "province": self.province,
            "poastal_code": self.postal_code,
        }
