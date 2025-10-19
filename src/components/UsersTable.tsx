"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <Table className="rounded-2xl border shadow-md">
      <TableCaption>A list of registered users.</TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800">
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="w-[100px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <TableCell>{user.id}</TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="text-blue-600 hover:text-blue-800"
                title="Edit user"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="text-red-600 hover:text-red-800"
                title="Delete user"
              >
                🗑️
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
