from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
import profiles

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Dummy data for demonstration purposes
# In a real application, you'd fetch this from a database
# PROFILES = [
#     {"id": 1, "name": "John Doe", "age": 30, "gender": "male", "occupation": "Engineer", "image": "male_1.jpg", "zodiac": "Cancer", "Date_of_Birth": "May 28, 1995", "Time_of_Birth": "5:00 AM"},
#     {"id": 2, "name": "Jane Smith", "age": 28, "gender": "female", "occupation": "Doctor", "image": "female_1.jpg", "zodiac": "Leo", "Date_of_Birth": "Apr 28, 1997", "Time_of_Birth": "8:27 AM"},
#     {"id": 3, "name": "Peter Jones", "age": 35, "gender": "male", "occupation": "Artist", "image": "male_2.jpg", "zodiac": "Gemini", "Date_of_Birth": "Nov 17, 1990", "Time_of_Birth": "7:45 AM"},
#     {"id": 4, "name": "Alice Brown", "age": 25, "gender": "female", "occupation": "Designer", "image": "female_2.jpg", "zodiac": "Virgo", "Date_of_Birth": "May 14, 1999", "Time_of_Birth": "12:00 PM"},
#     {"id": 5, "name": "Michael Green", "age": 40, "gender": "male", "occupation": "Teacher", "image": "male_3.jpg", "zodiac": "Scorpio", "Date_of_Birth": "Mar 03, 1985", "Time_of_Birth": "Unknown"},
#     {"id": 6, "name": "Sarah White", "age": 32, "gender": "female", "occupation": "Developer", "image": "female_3.jpg", "zodiac": "Aries", "Date_of_Birth": "Jan 12, 1992", "Time_of_Birth": "3:12 PM"},
#     {"id": 7, "name": "David Black", "age": 29, "gender": "male", "occupation": "Musician", "image": "male_4.jpg", "zodiac": "Libra", "Date_of_Birth": "Sep 2, 1996", "Time_of_Birth": "7:21 PM"},
#     {"id": 8, "name": "Emily Grey", "age": 27, "gender": "female", "occupation": "Writer", "image": "female_4.jpg", "zodiac": "Pisces", "Date_of_Birth": "Oct 17, 1997", "Time_of_Birth": "10:22 PM"},
#     {"id": 9, "name": "Robert Blue", "age": 33, "gender": "male", "occupation": "Architect", "image": "male_5.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 10, "name": "Olivia Red", "age": 31, "gender": "female", "occupation": "Chef", "image": "female_5.jpg", "zodiac": "Cancer", "Date_of_Birth": "Aug 22, 1994", "Time_of_Birth": "12:12 AM"},
#     {"id": 11, "name": "James Yellow", "age": 26, "gender": "male", "occupation": "Pilot", "image": "male_1.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 12, "name": "Sophia Violet", "age": 34, "gender": "female", "occupation": "Scientist", "image": "female_6.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 13, "name": "Daniel Orange", "age": 38, "gender": "male", "occupation": "Journalist", "image": "male_2.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 14, "name": "Isabella Pink", "age": 29, "gender": "female", "occupation": "Dancer", "image": "female_7.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 15, "name": "William Gold", "age": 30, "gender": "male", "occupation": "Doctor", "image": "male_3.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 16, "name": "Ava Silver", "age": 28, "gender": "female", "occupation": "Engineer", "image": "female_1.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 17, "name": "Liam Bronze", "age": 35, "gender": "male", "occupation": "Artist", "image": "male_4.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 18, "name": "Mia Copper", "age": 25, "gender": "female", "occupation": "Designer", "image": "female_2.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 19, "name": "Noah Platinum", "age": 40, "gender": "male", "occupation": "Teacher", "image": "male_5.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 20, "name": "Charlotte Rhodium", "age": 32, "gender": "female", "occupation": "Developer", "image": "female_3.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 21, "name": "Lucas Iridium", "age": 29, "gender": "male", "occupation": "Musician", "image": "male_1.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 22, "name": "Amelia Palladium", "age": 27, "gender": "female", "occupation": "Writer", "image": "female_4.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 23, "name": "Benjamin Osmium", "age": 33, "gender": "male", "occupation": "Architect", "image": "male_2.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 24, "name": "Harper Ruthenium", "age": 31, "gender": "female", "occupation": "Chef", "image": "female_5.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 25, "name": "Elijah Scandium", "age": 26, "gender": "male", "occupation": "Pilot", "image": "male_3.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 26, "name": "Evelyn Titanium", "age": 34, "gender": "female", "occupation": "Scientist", "image": "female_6.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 27, "name": "Mason Vanadium", "age": 38, "gender": "male", "occupation": "Journalist", "image": "male_4.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 28, "name": "Abigail Chromium", "age": 29, "gender": "female", "occupation": "Dancer", "image": "female_7.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 29, "name": "Logan Manganese", "age": 30, "gender": "male", "occupation": "Doctor", "image": "male_5.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
#     {"id": 30, "name": "Elizabeth Iron", "age": 28, "gender": "female", "occupation": "Engineer", "image": "female_1.jpg", "zodiac": "Gemini", "Date_of_Birth": "Feb 2, 1992", "Time_of_Birth": "3:43 AM"},
# ]


all_profiles = profiles.profiles()
PROFILES = json.loads(all_profiles.getProfiles())

# print(PROFILES)

@app.route('/api/profiles', methods=['GET'])
def get_profiles():
    page = request.args.get('page', 1, type=int)
    gender_filter = request.args.get('gender', type=str)
    age_min = request.args.get('age_min', type=int)
    age_max = request.args.get('age_max', type=int)
    name = request.args.get('name', type=str)
    sort_age = request.args.get('sort_age')

    filtered_profiles = PROFILES

    if gender_filter:
        filtered_profiles = [p for p in filtered_profiles if p['gender'] == gender_filter]
    if age_min:
        filtered_profiles = [p for p in filtered_profiles if p['age'] >= age_min]
    if age_max:
        filtered_profiles = [p for p in filtered_profiles if p['age'] <= age_max]
    if name:
        filtered_profiles = [p for p in filtered_profiles if name.lower() in p['NAME'].strip().lower()]
    if sort_age != '':
        print("Sort Age:", sort_age)
        sort_age = False if (sort_age == 'false') else True
        filtered_profiles = sorted(filtered_profiles, key=lambda x: x['age'], reverse=sort_age)

    # print(filtered_profiles[0])

    per_page = 24
    total_profiles = len(filtered_profiles)
    total_pages = (total_profiles + per_page - 1) // per_page
    
    start_index = (page - 1) * per_page
    end_index = (start_index + per_page)
    if page == 0:
        start_index = 0
        end_index = total_profiles
    paginated_profiles = filtered_profiles[start_index:end_index]

    return jsonify({
        'profiles': paginated_profiles,
        'total_pages': total_pages,
        'current_page': page,
        'total_profiles': total_profiles
    })

@app.route('/static/<path:filename>')
def static_files(filename):
    # Serve static images from the 'static' directory
    return send_from_directory('static', filename)

@app.route('/api/profiles/<int:profile_id>', methods=['GET'])
def get_single_profile(profile_id):
    profile = next((p for p in PROFILES if p['id'] == profile_id), None)
    if profile:
        return jsonify(profile)
    return jsonify({"message": "Profile not found"}), 404

if __name__ == '__main__':
    # Create a dummy static folder if it doesn't exist
    if not os.path.exists('static'):
        os.makedirs('static')
    # You'd typically have images like male_1.jpg, female_1.jpg etc. in this folder
    print("Please ensure you have some dummy images in the 'static/' directory (e.g., male_1.jpg, female_1.jpg).")
    # all_profiles = profiles()
    # PROFILES = all_profiles.getProfiles()

    #app.run(host='192.168.1.125', debug=True, port=5000)
    app.run(debug=True, port=5000)