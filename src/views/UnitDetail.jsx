import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { getUnits } from "../redux/actions/units";
import { useEffect, useState } from "react";

const UnitDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const units = useSelector((state) => state.units.units);
  const [unit, setUnit] = useState(null)

  useEffect(() => {
    dispatch(getUnits());
    setUnit(units?.find((unit) => unit?.id === Number(id)))
  }, [units]);


  if(!unit) return <p>Loading...</p>
  return (
    <div>
      <PageHeader title="Unit Detail Page" />
      <table>
        <tbody>
          <tr key="id">
            <td>ID: {unit.id}</td>
          </tr>
          <tr key="name">
            <td>Name: {unit.name}</td>
          </tr>
          <tr key="description">
            <td>Description: {unit.description}</td>
          </tr>
          <tr key="age">
            <td>Min. Required Age: {unit.age}</td>
          </tr>
          <tr key="Wood">
            <td>Wood Cost: {unit.cost.Wood}</td>
          </tr>
          <tr key="Food">
            <td>Food Cost: {unit.cost.Food}</td>
          </tr>
          <tr key="Gold">
            <td>Gold Cost: {unit.cost.Gold}</td>
          </tr>
          <tr key="build_time">
            <td>Build Time: {unit.build_time}</td>
          </tr>
          <tr key="reload_time">
            <td>Reload Time: {unit.reload_time}</td>
          </tr>
          <tr key="hit_points">
            <td>Hit Points: {unit.hit_points}</td>
          </tr>
          <tr key="attack">
            <td>Attack: {unit.attack}</td>
          </tr>
          <tr key="accuracy">
            <td>Accuracy: {unit.accuracy}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UnitDetail;
