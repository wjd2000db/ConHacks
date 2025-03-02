from pydantic import BaseModel
from typing import Optional

class Medication(BaseModel):
    medication: str
    drug_name: str
    purpose: str
    common_sideeffects: str
    serious_sideeffects: str
    interaction_warnings: str


def __init__(self,medication: str, medi_name: str, purpose: str, common_sideeffects: str, serious_sideeffects: str, interaction_warnings: str):
        super().__init__(
            medication=medication,
            drug_name=medi_name,
            purpose=purpose,
            common_sideeffects=common_sideeffects,
            serious_sideeffects=serious_sideeffects,
            interaction_warnings=interaction_warnings
)