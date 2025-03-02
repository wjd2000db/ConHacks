from fastapi import APIRouter, HTTPException, Query
from models.users import User
from models.members import Member
from models.medication import Medication
from config.database import collection_name
from schema.schemas import list_serial_user
from schema.schemas import list_serial_member
from schema.schemas import individual_serial_user
from bson import ObjectId
from collections import defaultdict
from dataclasses import dataclass, asdict
import requests
import json
import os
# import openai
import time
from openai import RateLimitError, APIError

import google.generativeai as genai
from google.api_core.exceptions import GoogleAPIError

from dotenv import load_dotenv
load_dotenv()

fda_data_dict = defaultdict(list)
drugname = 'betamethasone'
fda_url = "https://api.fda.gov/drug/label.json?search=openfda.brand_name:Benadryl&limit=1"
router = APIRouter()

# OpenAI
# key=os.getenv("OPENAI_KEY")
# client = openai.OpenAI(api_key=key)

# Gemini
gemkey=os.getenv("GEM_KEY")
genai.configure(api_key=gemkey)
model = genai.GenerativeModel('models/gemini-1.5-pro-latest')

router = APIRouter()

#GET Request Method
@router.get("/")  
async def get_user_by_email(email: str = Query(..., description="User email")):
    user = collection_name.find_one({"email": email})
    
    if user:
        return individual_serial_user(user)
    
    raise HTTPException(status_code=404, detail="User not found")


#POST Request Method
@router.post("/")
async def post_user(user: User):
  collection_name.insert_one(dict(user))

  if not result.inserted_id:
      raise HTTPException(status_code=500, detail="User could not be created")
  
  return {"message": "User created successfully", "id": str(result.inserted_id)}


#PUT Request Method
@router.put("/{id}")
async def put_user(id: str, user: User):
  collection_name.find_one_and_update({"_id": ObjectId(id)},{"$set": dict(user)})

#DELETE Request Method
@router.delete("/{id}")
async def delete_user(id:str):
  collection_name.find_one_and_delete({"_id":ObjectId(id)})


# MEMBER
@router.get("/members")
async def get_members():
    members = list_serial_member(collection_name.find())
    return members

# GET
@router.get("/members/{user_id}")
async def get_member_by_user(user_id: str):
    members = list_serial_member(collection_name.find({"userId": user_id}))
    if not members:
        raise HTTPException(status_code=404, detail="No members found for this user")
    return members

# POST
@router.post("/members")
async def post_member(member: Member):
    result = collection_name.insert_one(dict(member))

    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Member could not be created")
    
    return {"message": "Member created successfully", "id": str(result.inserted_id)}

# PUT
@router.put("/members/{id}")
async def put_member(id: str, member: Member):
    updated_member = collection_name.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(member)}
    )

    if not updated_member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    return {"message": "Member updated successfully"}

# DELETE
@router.delete("/members/{id}")
async def delete_member(id: str):
    deleted_member = collection_name.find_one_and_delete({"_id": ObjectId(id)})

    if not deleted_member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    return {"message": "Member deleted successfully"}


# add request for new medication item
@router.post("/medication/{medi_name}")
async def post_medication(medi_name: str):
  # print(medi_name)
  response = requests.get(fda_url)
  response_obj = response.json()
  drug_info = response_obj.get("results")

  # models = genai.list_models()

  # # Print model names and supported methods
  # for model in models:
  #     print(f"Model Name: {model.name}")
  #     print(f"Supported Methods: {model.supported_generation_methods}")
  #     print("-" * 40)

  # FDA api
  usage = None
  dosage = None
  for info in drug_info:
    usage = info.get("indications_and_usage")[0]
    dosage = info.get("dosage_and_administration")[0]
    # print(type(usage))
    # print(type(dosage))


  # OpenAI API
  # try:
  #   msg = f"Given the following drug information, provide a simplified explanation for easy patient's understanding for each medication in Json template, each point explained within three sentences including: Purpose: Common side effects: Serious side effects: Relevant interaction warnings (if applicable): input={usage}, {dosage}"
  #   chat_completion = client.chat.completions.create(
  #     messages=[
  #         {"role": "system", "content": "You are a health assistant."},
  #         {"role": "user", "content": msg}
  #     ],
  #     model="gpt-3.5-turbo",
  #   )
  #   print(chat_completion)
  # except RateLimitError as e:
  #   print(f"RateLimitError: {e}")
  # except APIError as e:
  #   print(f"OpenAI API Error: {e}")
  # except Exception as e:
  #   print(f"An unexpected error occurred: {e}")

  # GEMINI
  msg = f"Given the following drug information, provide a simplified explanation for easy patient's understanding for each medication, each point explained within three sentences including titles of Purpose, Common side effects, Serious side effects, Relevant interaction warnings (if applicable) with their contents and put delimeter of ~ for each content. input={usage}, {dosage}"
  response = model.generate_content(
     contents=[
        {"role": "user", "parts": [msg]}
        ]
        )
  print("gemini response:", response.text)
  split_response = response.text.strip().split('~')
  # print(len(split_response))
  name = split_response[0].replace("~", "").replace("Medication:", "").replace("*", "").rstrip()
  pps = split_response[1].replace("~", "").replace("Purpose:", "").replace("*", "").rstrip()
  common_se = split_response[2].replace("~", "").replace("Common Side Effects:", "").replace("*", "").rstrip()
  serious_se = split_response[3].replace("~", "").replace("Serious Side Effects:", "").replace("*", "").rstrip()
  relevant_int = split_response[4].replace("~", "").replace("Relevant Interaction Warnings:", "").replace("*", "").rstrip()
  # print(name)
  # print(pps)
  # print(common_se)
  # print(serious_se)
  # print(relevant_int)

  med = Medication(drug_name=name, purpose=pps, common_sideeffects=common_se,serious_sideeffects=serious_se, interaction_warnings=relevant_int)
  med_dict = med.dict()

  result = collection_name.insert_one(med_dict)

  if result.inserted_id:
      print("Medication inserted successfully with ID:", result.inserted_id)
  else:
      print("Failed to insert medication.")

