from pydantic import BaseModel
from typing import Optional

class Medication(BaseModel):
    drug_name: str
    purpose: str
    common_sideeffects: str
    serious_sideeffects: str
    interaction_warnings: str


def __init__(self, medi_name: str, purpose: str, common_sideeffects: str, serious_sideeffects: str, interaction_warnings: str):
        super().__init__(
            drug_name=medi_name,
            purpose=purpose,
            common_sideeffects=common_sideeffects,
            serious_sideeffects=serious_sideeffects,
            interaction_warnings=interaction_warnings
)