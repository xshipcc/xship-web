import React, { useContext, useEffect, useRef, useState } from 'react';
import type {
  ListUavFlyReqType,
  ListUavFlyRespType,
  NodeType,
  NodeDataType,
  ListUavFlyDataType,
} from '@/pages/drone/routePlan/data';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { MutableRefObject, useImperativeHandle } from 'react';
interface Item {
  key: string;
  horizontal: number;
  vertical: number;
  stayTime: number;
}
const originData: Item[] = [];
for (let i = 0; i < 3; i++) {
  originData.push({
    key: '1',
    horizontal: 1,
    vertical: 1,
    stayTime: 1,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0, maxWidth: 40 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableEditable: React.FC = (listData: any) => {
  console.log('listData:', listData.listData);
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>(listData.listData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  // export interface NodeDataType {
  //   id: number;
  //   horizontal: number;
  //   vertical: number;
  //   stayTime: number;
  // }
  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '水平轴',
      editable: true,
      dataIndex: 'horizontal',
    },
    {
      title: '垂直轴',
      editable: true,
      dataIndex: 'vertical',
    },
    {
      title: '停留(秒)',
      editable: true,
      dataIndex: 'stayTime',
    },
    {
      title: (
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => {
            console.log('data:', 1111111111);
            setData([
              ...data,
              {
                key: data.length + 1 + '',
                horizontal: 1,
                vertical: 1,
                stayTime: 1,
              },
            ]);
          }}
        >
          添加
        </a>
      ),
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              保存
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'key' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        pagination={false}
        scroll={{ y: 250 }}
        size="small"
        columns={mergedColumns}
        rowClassName="editable-row"
      />
    </Form>
  );
};
export default TableEditable;
