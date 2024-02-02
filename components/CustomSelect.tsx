import React from "react";
import Select from "react-select";
import Image from "next/image";
import img1 from "../public/images/united-kingdom.svg";
import img2 from "../public/images/vn.svg";
import styles from "../styles/CustomSelect.module.css";

const options = [
  { value: "en", label: "English", image: img1 },
  { value: "vi", label: "Vietnamese", image: img2 },
  // Add more options as needed
];
const customStyles = {
    control: (provided:any) => ({
        ...provided,
        backgroundColor: '#0a1013',
        borderRadius: '4px',
        border: 'none',
        outline:'none',
        color: '#fff',
        cursor: 'pointer'
      }),
      option: (provided:any, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#0a1013' : '#0a1013',
        color: state.isSelected ? '#fff' : '#fff',
        cursor: 'pointer'
      }),

}

const CustomSelect = ({ onChange }) => {
    const defaultOption = options.find((option) => option.value === 'en');
  return (
    <Select
    styles={customStyles}
      options={options}
      onChange={onChange}
      defaultValue={defaultOption}
      getOptionLabel={(option) => (
        <div className={styles.selectLangue}>
          <Image
            src={option.image}
            alt="picture"
            width={24}
            height={24}
          />
          {option.label}
        </div>
      )}
      getOptionValue={(option) => option.value}
    />
  );
};

export default CustomSelect;

// import * as React from "react";
// import Avatar from "@mui/joy/Avatar";
// import ListItemDecorator from "@mui/joy/ListItemDecorator";
// import ListDivider from "@mui/joy/ListDivider";
// import Select, { SelectOption } from "@mui/joy/Select";
// import Option from "@mui/joy/Option";
// import img1 from "../public/images/united-kingdom.svg";
// import img2 from "../public/images/vn.svg";
// import Image from "next/image";

// const options = [
//   { value: "1", label: "English", image: img1 },
//   { value: "2", label: "Vietnamese", image: img2 },
//   // { value: '3', label: 'Erika', src: '/static/images/avatar/3.jpg' },
// ];

// function renderValue(option: SelectOption<string> | null) {
//   if (!option) {
//     return null;
//   }

//   return (
//     <React.Fragment>
//       <div className="">
//         <ListItemDecorator>
//           <Image
//             src={options.find((o) => o.value === option.value)?.image}
//             alt="picture"
//             width={24}
//             height={24}
//           />
//         </ListItemDecorator>
//         {option.label}
//       </div>
//     </React.Fragment>
//   );
// }

// export default function SelectCustomOption() {
//   return (
//     <Select
//       color="neutral"
//       variant="solid"
//       defaultValue="1"
//       slotProps={{
//         listbox: {
//           sx: {
//             "--ListItemDecorator-size": "44px",
//           },
//         },
//       }}
//       sx={{
//         "--ListItemDecorator-size": "44px",
//         minWidth: 240,
//       }}
//       renderValue={renderValue}
//     >
//       {options.map((option, index) => (
//         <React.Fragment key={option.value}>
//           {index !== 0 ? (
//             <ListDivider role="none" inset="startContent" />
//           ) : null}
//           <Option value={option.value} label={option.label}>
//             <ListItemDecorator>
//               <Image src={option.image} alt="picture" width={24} height={24} />
//             </ListItemDecorator>
//             {option.label}
//           </Option>
//         </React.Fragment>
//       ))}
//     </Select>
//   );
// }
