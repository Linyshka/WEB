import "./EmployeeItem.css";

export function EmployeeItem({name, major, expirience, profile}) {
  return (
    <div className='container employee-container'>
      <img src={profile} alt='employee' />
      <div className='employee-information'>
        <h3>{name}</h3>
      <p>Специализация: {major}</p>
      <p>Опыт: {expirience}</p>
      </div>
      
    </div>
  );
}
