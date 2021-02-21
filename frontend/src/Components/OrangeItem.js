function OrangeItem(props) {
  return (
    <>
      <tr>
        <td>{props.idx + 1}</td>
        <td> {props.item.name}</td>
        <td>Rs.{props.item.price}</td>
        <td className="delete" onClick={() => props.deleteHandler(props.idx)}>
          Delete
        </td>
      </tr>
    </>
  );
}

export default OrangeItem;
