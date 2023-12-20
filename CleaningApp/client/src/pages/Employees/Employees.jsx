import EmployeeItem from '../../components/EmployeeItem';
import {users} from "../../utils/constants";
import id1 from "../../assets/profile/1.jpeg";
import id2 from "../../assets/profile/2.jpg";
import id3 from "../../assets/profile/3.jpg";
import id4 from "../../assets/profile/4.jpg";
import id5 from "../../assets/profile/5.jpeg";

const Employees = () => {
  const usersImages = [id1, id2, id3, id4, id5];
  return (
    <div className='container'>
      {users.map((user, index) => <EmployeeItem {...user} key={user.id} profile={usersImages[index]} />)}
    </div>
  );
};

export default Employees;
