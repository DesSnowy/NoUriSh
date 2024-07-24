import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  return (
    <div className="mt-4 ml-10 mr-10">
      <h3 className="text-4xl font-semibold border-b-2 border-gray-400 py-2 mb-4">
        My Profile
      </h3>
      <div className="flex flex-row justify-around">
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
