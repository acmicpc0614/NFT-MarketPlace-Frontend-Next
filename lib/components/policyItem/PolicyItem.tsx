interface Policy {
  name: string;
  cost: number;
  description: string;
}

const PolicyItem:React.FC<Policy> = ({name, cost, description}) => {
  return <>
    <div className="flex flex-row justify-between bg-dark-blue p-5 rounded-md hover:cursor-pointer select-none">
      <div className="flex flex-row gap-5">
        <p>{name}</p>
        <p>{cost}</p>
        <p>{description}</p>
      </div>
      <div className="text-light-blue hover:text-white hover:cursor-pointer ">BUY</div>
    </div>
  </>
}

export default PolicyItem;