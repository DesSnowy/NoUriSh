const MenuDetails = ({ item }) => {
  return (
    <div className="h-screen flex items-center bg-cover bg-center bg-no-repeat">
      <div className="flex flex-row justify-around space-x-5">
        <h3>{item.item}</h3>
        <p>{item.price}</p>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default MenuDetails;
