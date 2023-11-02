# opt-table

opt-table is a versatile and customizable React table package built with [Material-UI](https://mui.com/) and [Framer Motion](https://www.framer.com/motion/). It provides a feature-rich table component for your React applications, including support for pagination, collapsible rows, sorting, and a responsive design.

## Features

- **Pagination:** Easily implement pagination with options for the number of rows per page and navigation controls.

- **Collapsible Rows:** Make your table more interactive by allowing users to expand and collapse rows for additional details.

- **Sorting:** Enable sorting on one or multiple columns for a better user experience.

- **Responsive Design:** "opt-table" is designed to adapt to different screen sizes, making it suitable for both desktop and mobile applications.

- **Customization:** You have full control over the appearance and behavior of the table through custom styling and callbacks.

## Props

- **table_header_list:** An array of objects with the following properties.
  ```jsx
  type tableHeaderProps = {
    width?: string | number,
    is_server_side?: boolean,
    has_details_penel?: boolean,
    header_style?: React.CSSProperties,
    row_style?: React.CSSProperties,
    Render?: React.FunctionComponent<{ renderData: T }>,
    title: string | undefined,
    table_key: string,
    align: "center" | "left" | "right" | "inherit" | "justify" | undefined,
    sortable?: boolean,
  };
  ```
- **data:** An array of objects with the actual data - every header uses table_key to access it's coresponding data.
- **DetailsPanel:** An array of objects - with the following data.

  ```jsx
  type detailPanelProps = {
    // you should specify a table key from your data object ,so when that cell is clicked collapse table will opens
    table_key: string,

    // a component to be render as a detail panel ,this component will recive an ebject with the row data
    Component: React.FunctionComponent,
  };
  ```

- **container_style:** css properties for table container
- **default_sort:** default sort for table.
- **has_pagination:** a boolean to specify has pagination or not .
- **options:** awailable options for table so far :

```jsx
type optionType = {
  direction: "rtl" | "ltr",
};
```

## Installation

Install opt-table and its dependencies using npm :

```bash
npm install --legacy-peer-deps
```

## Usage

```jsx
import React from "react";
import { OptTable } from "opt-table";

function MyTable() {
  // Your data source
  const data = [
    // Your data objects here
  ];

  // Define columns

  const table_head_list = [
    /*
      an array of object with tableHeaderProps types

    */
  ];

  return (
    <OptTable
      data={data}
      table_head_list={columns}
      default_sort="name"
      has_pagination={true}
      DetailsPanel={[
        { table_key: "name", Component: ProfileDetailPanel },
        { table_key: "resume", Component: ResumeDetailPanel },
      ]}
      container_style={{ border: "1px solid #999" }}
    />
  );
}
```

Please refer to the official documentation for more details and customization options.

## TypeScript Support

opt-table is developed using TypeScript, providing strong type checking and improved development experiences for TypeScript users.

<!-- ## Usage with TypeScript

When using "opt-table" in a TypeScript project, you can take full advantage of type safety and autocomplete for props and data structures. Make sure to include TypeScript definitions when importing the package. -->

<!-- ## Documentation

For detailed usage and customization instructions, check out the official documentation [here](#). -->

## License

This package is open-source and available under the [MIT License](LICENSE).

<!-- ## Contributing

We welcome contributions from the community. Please read our [Contribution Guidelines](CONTRIBUTING.md) for more information on how to get started. -->

## Issues

If you encounter any issues or have feature requests, please submit them on our [GitHub Issues](https://github.com/your-repo/opt-table/issues) page.

## Author

"opt-table" is developed and maintained by [Amin Hoseiny](https://github.com/ir-tec).

Happy tabling with opt-table! 🚀
