import pandas as pd
import numpy as np
from pathlib import Path
import os

current_script_path = Path(__file__).resolve()
current_directory = current_script_path.parent
parent_folder = current_directory.parent
database_folder = parent_folder / "database"


class profiles:

    def __init__(self):

        now = pd.to_datetime('now')

        self.df_boys = pd.read_csv(os.path.join(database_folder, 'PS BOYS.csv'))
        self.df_boys['cell'] = (self.df_boys['cell'].astype(str))
        self.df_boys['DOB'] = pd.to_datetime(self.df_boys['DOB'], format='%Y-%m-%dT00:00', errors='coerce').dt.date
        self.df_boys['age'] = (self.df_boys['DOB'].apply(lambda x: (now.year - x.year)))
        self.df_boys.rename(columns={'NO': 'id', 'JOB LOCN': 'Job_Location', 'Hyd House': 'Hyd_House', 'cell': 'CONTACT', 'height': 'HEIGHT'}, inplace=True)
        self.df_boys['gender'] = 'male'
        self.df_boys['married'] = 'no'
        # self.df_boys = self.df_boys.fillna('Unknown')
        # print(self.df_boys)
        
        self.df_boys2 = pd.read_csv(os.path.join(database_folder, 'PS BOYS 2nd match.csv'))
        self.df_boys2['cell'] = self.df_boys2['cell'].astype(str)
        self.df_boys2['DOB'] = pd.to_datetime(self.df_boys2['DOB'], format='%Y-%m-%dT00:00', errors='coerce').dt.date
        self.df_boys2['age'] = self.df_boys2['DOB'].apply(lambda x: (now.year - x.year))
        self.df_boys2.rename(columns={'NO': 'id', 'JOB LOCN': 'Job_Location', 'Hyd House': 'Hyd_House', 'cell': 'CONTACT', 'height': 'HEIGHT'}, inplace=True)
        self.df_boys2['gender'] = 'male'
        self.df_boys2['married'] = 'yes'
        # self.df_boys2 = self.df_boys2.fillna('Unknown')

        self.df_girls = pd.read_csv(os.path.join(database_folder, 'PS GIRLS.csv'))
        self.df_girls['cell'] = (self.df_girls['cell'].astype(str))
        self.df_girls['DOB'] = pd.to_datetime(self.df_girls['DOB'], format='%Y-%m-%dT00:00', errors='coerce').dt.date
        self.df_girls['age'] = self.df_girls['DOB'].apply(lambda x: (now.year - x.year))
        self.df_girls.rename(columns={'RMARKS': 'REMARKS', 'NO': 'id', 'JOB LOCN': 'Job_Location', 'Hyd House': 'Hyd_House', 'cell': 'CONTACT', 'height': 'HEIGHT'}, inplace=True)
        self.df_girls['PROPERTY'] = 'Unknown'
        self.df_girls['Hyd House'] = 'Unknown'
        self.df_girls['gender'] = 'female'
        self.df_girls['married'] = 'no'
        self.df_girls['id'] = self.df_girls['id'] + 99000
        # self.df_girls = self.df_girls.fillna('Unknown')

        self.df_girls2 = pd.read_csv(os.path.join(database_folder, 'PS GIRLS 2nd.csv'))
        self.df_girls2['cell'] = (self.df_girls2['cell'].astype(str))
        self.df_girls2['DOB'] = pd.to_datetime(self.df_girls2['DOB'], format='%Y-%m-%dT00:00', errors='coerce').dt.date
        self.df_girls2['age'] = self.df_girls2['DOB'].apply(lambda x: (now.year - x.year))
        self.df_girls2.rename(columns={'RMARKS': 'REMARKS', 'NO': 'id', 'JOB LOCN': 'Job_Location', 'Hyd House': 'Hyd_House', 'cell': 'CONTACT', 'height': 'HEIGHT'}, inplace=True)
        self.df_girls2['PROPERTY'] = 'Unknown'
        self.df_girls2['Hyd House'] = 'Unknown'
        self.df_girls2['gender'] = 'female'
        self.df_girls2['married'] = 'yes'
        self.df_girls2['id'] = self.df_girls2['id'] + 99000
        # self.df_girls2 = self.df_girls2.fillna('Unknown')
        
        self.details = ['id', 'gender', 'age', 'NAME', 'DOB', 'TIME', 'NAKSHATRA', 'HEIGHT', 'STUDY', 'Job_Location', 'FAMILY', 'NATIVE', 'married', 'image']

    def setImage(self, row):
        return f"{row['gender']}_{str(row['id'])[-1]}.jpg"

    def getProfiles(self):
        profiles = pd.concat([self.df_boys,
                              self.df_boys2, 
                              self.df_girls, 
                              self.df_girls2
                              ], ignore_index=True, axis=0)
        profiles['image'] = profiles.apply(self.setImage, axis=1)
        profiles['TIME'] = profiles['TIME'].astype(str)
        profiles['DOB'] = profiles['DOB'].astype(str)
        profiles['id'] = profiles['id'].astype(int)
        profiles['age'] = profiles['age'].fillna(0).astype(int)
        profiles['NAME'] = profiles['NAME'].astype(str)
        profiles['NAME'] = profiles['NAME'].apply(lambda x: x.title())
        profiles['NAME'] = profiles['NAME'].replace('Nan','Unknown')
        # print(profiles[self.details].to_json(orient='records'))
        return profiles[self.details].to_json(orient='records')
        # print(profiles.iloc[96][['id', 'gender', 'age', 'NAME', 'DOB', 'image']])
        # print(profiles[['id', 'gender', 'age', 'NAME', 'DOB', 'image']].to_json(orient='records'))
        # return profiles[['id', 'gender', 'age', 'NAME', 'DOB', 'image']].to_json(orient='records')
    
    def getBoysProfiles(self):
        boys = pd.concat([self.df_boys, self.df_boys2], ignore_index=True, axis=0)
        # print(boys[self.details])
        boys['image'] = boys.apply(self.setImage, axis=1)
        return boys[self.details].to_json(orient='records')

    def getGirlsProfiles(self):
        girls = pd.concat([self.df_girls, self.df_girls2], ignore_index=True, axis=0)
        # print(girls[self.details])
        girls['image'] = girls.apply(self.setImage, axis=1)
        return girls[self.details].to_json(orient='records')
    
    def getBoys2Profiles(self):
        boys = self.df_boys2
        boys['image'] = boys.apply(self.setImage, axis=1)
        return boys[self.details].to_json(orient='records')  
    
    def getGirls2Profiles(self):
        girls = self.df_girls2
        girls['image'] = girls.apply(self.setImage, axis=1)
        return girls[self.details].to_json(orient='records')

if __name__ == '__main__':
    print('runningg')
    prof = profiles()
    prof.getGirlsProfiles()
    prof.getBoysProfiles()
    prof.getProfiles()