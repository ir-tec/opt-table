import { Meta, StoryObj } from "@storybook/react";
import { CustomTable } from "../components/table/table_screen";
import TestDetailsPanel from "../components/table/test_details_panel";
import TestDetailsPanels from "../components/table/test_2_details_panel";

const meta: Meta = {
  title: "Table",
  component: CustomTable,
} satisfies Meta<typeof CustomTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstTable: Story = {
  args: { 
    DetailsPanel:[
      {table_key:"test",Component:TestDetailsPanel}
      ,{table_key:"name",Component:TestDetailsPanels}
      // ,{table_key:"action_cell",Component:TestDetailsPanels}
  
  ],
    table_head_list: [
      { title: "test", table_key: "test",has_details_penel:true,align:"left" },
      { title: "Name", table_key: "name",has_details_penel:true },
  
  ],
    data: [
      { test: 2, name:"Amin" },
      { test: 1, name:"Amin" },
      { test: 3, name:"Amin" },
      { test: 5, name:"Amin" },
      { test: 2, name:"Amin" },
      { test: 1, name:"Amin" },
      { test: 3, name:"Amin" },
      { test: 5, name:"Amin" },
      { test: 2, name:"Amin" },
      { test: 1, name:"Amin" },
      { test: 3, name:"Amin" },
      { test: 5, name:"Amin" },
      { test: 2, name:"Amin" },
      { test: 1, name:"Amin" },
      { test: 3, name:"Amin" },
      { test: 5, name:"Amin" },
      { test: 2, name:"Amin" },
      { test: 1, name:"Amin" },
      { test: 3, name:"Amin" },
      { test: 5, name:"Amin" },
    ],
  },
};

// function Template<T>(args: CustomTableInterface<T>) {
//   return <CustomTable {...args} />;
// }

// export const Table_one = Template.bind({});
// Table_one.args = {
//   table_head_list: [{ title: "test", table_key: "test" }],
//   data: [{ test: 2 }, { test: 1 }, { test: 3 }, { test: 5 }],
// };
