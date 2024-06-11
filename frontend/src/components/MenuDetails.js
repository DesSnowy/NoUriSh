const MenuDetails = () => {
    return (
      <div className="h-screen flex items-center bg-cover bg-center bg-no-repeat">
        <div className="flex flex-row justify-around space-x-5">
          <h3>{menu.item}</h3>
          <p>{menu.price}</p>
          <p>{menu.description}</p>
        </div>
      </div>
    );
}

export default MenuDetails