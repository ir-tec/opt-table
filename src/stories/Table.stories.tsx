import { Meta, StoryObj } from "@storybook/react";

import { Table } from "./table_example";

const meta: Meta = {
  title: "Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstTable: Story = {};
