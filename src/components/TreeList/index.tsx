// @ts-nocheck
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { Tree } from 'antd';
import type { Key } from 'rc-tree/lib/interface';
import {
  EditOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import { nanoid } from 'nanoid';
import styles from './index.less';
const { TreeNode } = Tree;
interface ITreeNode {
  title?: ReactNode;
  value: string;
  defaultValue?: string;
  key: Key;
  parentKey?: Key;
  isEditable?: boolean;
  children?: ITreeNode[];
}
const treeData: ITreeNode[] = [
  {
    value: '东三北方五线',
    defaultValue: '0',
    key: '0',
    parentKey: '0',
    isEditable: false,
    children: [
      {
        value: '0-1',
        key: '0-1',
        defaultValue: '0-1',
        isEditable: false,
      },
    ],
  },
];

const expandedKeyArr: Key[] = ['0'];
export default function TreeDemo() {
  const [data, setData] = useState(treeData);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(expandedKeyArr);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onExpand = (expandedKeys: Key[]) => {
    //记录折叠的key值
    setExpandedKeys(expandedKeys);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const editNode = (key: Key, data: ITreeNode[]) =>
    data.forEach((item) => {
      if (item.key === key) {
        item.isEditable = true;
      } else {
        item.isEditable = false;
      }
      item.value = item.defaultValue!; // 当某节点处于编辑状态，并改变数据，点击编辑其他节点时，此节点变成不可编辑状态，value 需要回退到 defaultvalue
      if (item.children) {
        editNode(key, item.children);
      }
    });
  const onEdit = (key: Key) => {
    editNode(key, treeData);
    setData(treeData.slice());
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const addNode = (key: Key, data: ITreeNode[]) =>
    data.forEach((item) => {
      if (item.key === key) {
        if (item.children) {
          item.children.push({
            value: 'default',
            key: nanoid(), // 这个 key 应该是唯一的
          });
        } else {
          item.children = [];
          item.children.push({
            value: 'default',
            key: nanoid(),
          });
        }
        return;
      }
      if (item.children) {
        addNode(key, item.children);
      }
    });

  const onAdd = (key: Key) => {
    if (expandedKeys.indexOf(key) === -1) {
      expandedKeyArr.push(key);
    }
    setExpandedKeys(expandedKeyArr.slice());

    addNode(key, treeData);
    //useState里数据务必为immutable （不可赋值的对象），所以必须加上slice()返回一个新的数组对象
    setData(treeData.slice());
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const changeNode = (key: Key, value: string, data: ITreeNode[]) =>
    data.forEach((item) => {
      if (item.key === key) {
        item.value = value;
      }
      if (item.children) {
        changeNode(key, value, item.children);
      }
    });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: Key) => {
    changeNode(key, e.target.value, treeData);
    setData(treeData.slice());
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const saveNode = (key: Key, data: ITreeNode[]) =>
    data.forEach((item) => {
      if (item.key === key) {
        item.defaultValue = item.value;
      }
      if (item.children) {
        saveNode(key, item.children);
      }
      item.isEditable = false;
    });

  const onSave = (key: Key) => {
    saveNode(key, treeData);
    setData(treeData.slice());
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const closeNode = (key: Key, defaultValue: string, data: ITreeNode[]) =>
    data.forEach((item) => {
      item.isEditable = false;
      if (item.key === key) {
        item.value = defaultValue;
      }
      if (item.children) {
        closeNode(key, defaultValue, item.children);
      }
    });

  const onClose = (key: Key, defaultValue: string) => {
    closeNode(key, defaultValue, treeData);
    setData(treeData);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const deleteNode = (key: Key, data: ITreeNode[]) =>
    data.forEach((item, index) => {
      if (item.key === key) {
        data.splice(index, 1);
        return;
      } else {
        if (item.children) {
          deleteNode(key, item.children);
        }
      }
    });

  const onDelete = (key: Key) => {
    deleteNode(key, treeData);
    setData(treeData.slice());
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderTreeNodes = (data: ITreeNode[]) => {
    const nodeArr = data.map((item) => {
      if (item.isEditable) {
        item.title = (
          <div>
            <input value={item.value || ''} onChange={(e) => onChange(e, item.key)} />

            <CloseOutlined
              style={{ marginLeft: 10 }}
              onClick={() => onClose(item.key, item.defaultValue!)}
            />

            <CheckOutlined style={{ marginLeft: 10 }} onClick={() => onSave(item.key)} />
          </div>
        );
      } else {
        item.title = (
          <div>
            <span>{item.value}</span>
            <span>
              <EditOutlined
                style={{ marginLeft: 10 }}
                onClick={() => onEdit(item.key)}
                className={styles.content}
              />
              <PlusOutlined style={{ marginLeft: 10 }} onClick={() => onAdd(item.key)} />
              {item.parentKey === '0' ? null : (
                <MinusOutlined style={{ marginLeft: 10 }} onClick={() => onDelete(item.key)} />
              )}
            </span>
          </div>
        );
      }

      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }

      return <TreeNode title={item.title} key={item.key} />;
    });

    return nodeArr;
  };

  return (
    <div>
      <Tree expandedKeys={expandedKeys} onExpand={onExpand} showLine={true} className={styles.tree}>
        {renderTreeNodes(data)}
      </Tree>
    </div>
  );
}
