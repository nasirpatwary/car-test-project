import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth()
    return (
        <div>
            {user?.displayn}
        </div>
    );
};

export default UserHome;