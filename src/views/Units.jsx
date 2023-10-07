import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { getUnits } from '../redux/actions/units';
import { valueExtractor } from '../helpers';
import '../styles/units.scss';


const initialCosts = [
  { id: 1, name: 'Wood', disabled: true, step: 20, value: '-' },
  { id: 2, name: 'Food', disabled: true, step: 25, value: '-' },
  { id: 3, name: 'Gold', disabled: true, step: 50, value: '-' },
];


const ages = ["All", "Dark", "Feudal", "Castle", "Imperial"];

const Units = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const units = useSelector((state) => state.units.units);
  const loading = useSelector((state) => state.units.loading);
  const error = useSelector((state) => state.units.error);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [selectedAge, setSelectedAge] = useState(ages[0]);
  const [costs, setCosts] = useState(initialCosts);

  useEffect(() => {
    dispatch(getUnits());
  }, []);

  useEffect(() => {
    let newUnits = [];
    units.forEach((unit) => {
      if (selectedAge === "All" || unit?.age === selectedAge) {
        if (unit?.cost) {
          let costRanges = valueExtractor(costs);
          let flag = true;
          Object.keys(costRanges).forEach((costRange) => {
            if (unit.cost[costRange]) {
              if (
                unit.cost[costRange] < Number(costRanges[costRange][0]) ||
                unit.cost[costRange] > Number(costRanges[costRange][1])
              ) {
                flag = false;
              }
            }
          });
          if (flag) {
            newUnits.push(unit);
          }
        }
      }
    });
    setFilteredUnits(newUnits);
  }, [selectedAge, costs, units]);

  const costRangeHandler = (item, value) => {
    let newValue = "-";
    if (value - item.step > -1) {
      newValue = `${value - item.step}-${value}`;
    }
    let newCosts = [...costs].map((cost) => {
      if (cost.id === item.id) {
        cost.value = newValue;
      }
      return cost;
    });
    setCosts(newCosts);
  };

  const costStatusHandler = (item, value) => {
    let newCosts = [...costs].map((cost) => {
      if (cost.id === item.id) {
        if (value) {
          cost.disabled = false;
        } else {
          cost.value = "-";
          cost.disabled = true;
        }
      }
      return cost;
    });
    setCosts(newCosts);
  };
  return (
    <div className="units">
      <PageHeader title="Units Page" />

      <div className="units-ages mb-4">
        <h3 className="units-ages-title mb-4">Ages</h3>
        {ages.map((age) => (
          <span
            key={age}
            onClick={() => setSelectedAge(age)}
            className={`units-ages-item ${age === selectedAge ? 'selected' : ''}`}
          >
            {age}
          </span>
        ))}
      </div>

      <div className="units-costs">
        <h3 className="units-consts-title">Costs</h3>
        {costs.map((item) => (
          <div className="units-costs-row" key={item.id}>
            <div>
              <input
                className="checkbox sme"
                type="checkbox"
                name={item.name}
                id={item.id}
                onChange={(e) => costStatusHandler(item, e.target.checked)}
              />
              <label className="label sme depressed" htmlFor={item.id}>
                {item.name}
              </label>
            </div>
            <div>
              <input
                className="slider"
                type="range"
                min="0"
                max="200"
                step={item.step}
                disabled={item.disabled}
                defaultValue={item.disabled ? 100 : undefined}
                id={item.id}
                onChange={(e) => costRangeHandler(item, e.target.value)}
              />
            </div>
            <div>
              <span>{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {units.length === 0 && !loading && <p>No units available!</p>}
      {error && !loading && <p>{error}</p>}

      {filteredUnits.length > 0 && (
        <table className="table ml-2">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
              <th>costs</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map((unit) => (
              <tr key={unit?.id} onClick={() => navigate(`/units/${unit?.id}`)}>
                <td>{unit?.id}</td>
                <td>{unit?.name}</td>
                <td>{unit?.age}</td>
                <td>
                  {unit?.cost &&
                    Object.entries(unit.cost)
                      .map(([key, value]) => `${key}:${value}`)
                      .join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Units;
