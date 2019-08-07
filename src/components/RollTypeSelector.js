import React from "react";
import Dropdown from "../base-components/Dropdown";

const RollTypeSelector = React.memo(props => {
  const rollTypes = [
    { id: "4d6dl", description: "4d6 (Drop Lowest)" },
    { id: "3d6", description: "3d6" },
    { id: "2d6p6", description: "2d6 + 6" },
  ];

  return (
    <Dropdown
      values={rollTypes}
      onSelect={type => props.changeType(type)}
      value={rollTypes.find(type => type.id === props.selectedType)}
    />
  );
});

export default RollTypeSelector;
