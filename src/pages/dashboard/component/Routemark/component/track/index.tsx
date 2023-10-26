import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import styles from './index.less';
import type { ListUavFlyReqType } from '@/pages/drone/routePlan/data';

import { queryFly } from '@/pages/drone/routePlan/service';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  id: number;
  name: string;
  data: string;
  create_time: string;
  creator: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState([
    {
      id: 0,
      name: 'string',
      data: 'string',
      create_time: 'string',
      creator: 'string',
    },
  ]);

  // 获取航线数据列表
  useEffect(() => {
    const fetchFlyData = async (params: ListUavFlyReqType) => {
      try {
        const Data = await queryFly(params);
        setDataSource(Data.data);
        return true;
      } catch (error) {
        console.log('fetchFlyData -> error:', error);
        return false;
      }
    };
    fetchFlyData({ pageSize: 10, current: 1 });
  }, []);

  const handleAdd = () => {
    const newData: DataType = {
      id: dataSource.length + 1,
      creator: '',
      name: `Edward King`,
      data: '32',
      create_time: `London, Park Lane no`,
    };
    setDataSource([newData, ...dataSource]);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '航线名称',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      editable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: (
        <div>
          <Button onClick={handleAdd} type="primary">
            添加航线
          </Button>
        </div>
      ),
      dataIndex: 'operation',
      // @ts-ignore
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button onClick={handleAdd} type="primary">
            航线预览
          </Button>
        ) : null,
    },
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div className={styles.trackList}>
      <Table
        pagination={{
          pageSize: 9,
          showSizeChanger: false,
        }}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default App;
