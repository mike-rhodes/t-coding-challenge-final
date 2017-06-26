Tempus Coding Challenge
Author: Michael Rhodes
Email: mrhodes262@gmail.com

While I was not able to fully complete the project due to other professional/personal obligations, I feel that I completed enough to have a meaningful discussion about my skillset.

N.B.: Most of my experience is in Python/Django. As such, if you see something that looks odd, please feel free to email me and ask for clarification.

To access the patient information, navigate to http://127.0.0.1:8888/patient/my_information/1, where the number at the end of the URL represents the patient's id.
To access the doctor information, navigate to http://127.0.0.1:8888/doctor

For the parts that I did not complete, I will outline what I would have done to complete them:

  1) Doctors and Patients sign in with username / password credentials:
    - I have a table called "user_info", which has the username, password and user type (doctor/patient). This doctor/patient designation would be stored in the session variable and be used later to limit the pages the doctor/patient can view.
    - The user authentication would be done using Passport.js.

  2) The system recognizes the user as either a doctor or a patient
    - See point #1 above.

  3) When a doctor selects a patient: Any past, future, and pending appointments with the patient are displayed.
    - This would be shown by querying the appointment_information table and shown in a similar fashion as the listing of patients.

  4) Any files attached to the patient’s medical record are displayed.
    - This is not something I have done in the past. I feel confident that I could figure it out; however, I was unable to do so yet due to time constraints.
    - If I were to venture a guess as to how to tackle this, I would have a directory containing all relevant documents and use a table listing the patient_id and the file names of the documents associated with that patient.
    - I believe that I would use the 'fs' module to read/write files.

  5) Upon signing in, patients see an overview of their information in the system. Their past, future, and pending appointments:
    - The logic for this is very similar to the ability of the doctor to create/modify appointments. I was unable to complete this due to time constraints.

  6) Any files attached to their medical record are displayed.
    - See point # 4 above.

Please let me know if you have any questions!
