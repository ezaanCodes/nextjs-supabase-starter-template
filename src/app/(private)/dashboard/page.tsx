"use client";

import client from "@/api/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UsersTable from "@/components/UsersTable";
import { Card, CardContent } from "@/components/ui/card";

type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  interface FormState {
    name: string;
    email: string;
    password: string;
  }

  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });

  const SignOut = () => {
    client.auth.signOut();
  };

  // Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await client
        .from('users')
        .select('*');
      
      if (error) throw error;
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // CREATE / UPDATE
  const handleSave = async () => {
    try {
      if (editingUser) {
        // Update
        const { error } = await client
          .from('users')
          .update(form)
          .eq('id', editingUser.id);
        
        if (error) throw error;
      } else {
        // Create
        const { error } = await client
          .from('users')
          .insert(form);
        
        if (error) throw error;
      }
      setForm({ name: "", email: "", password: "" });
      setEditingUser(null);
      setOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    try {
      const { error } = await client
        .from('users')
        .delete()
        .eq('id', id)
        .single(); // Add single() to ensure we're deleting one record
      
      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }

      await fetchUsers(); // Make sure we wait for the fetch to complete
      console.log('User deleted successfully'); // Debug log
    } catch (err) {
      console.error("Error deleting user:", err);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📊 Dashboard</h1>
        <Button onClick={SignOut}>Sign out</Button>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingUser(null)}>➕ Add User</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingUser ? "Edit User" : "Add User"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>
                  <Button className="w-full" onClick={handleSave}>
                    {editingUser ? "Update" : "Create"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <UsersTable
            users={users}
            onEdit={(user) => {
              setEditingUser(user);
              setForm({ 
                name: user.name, 
                email: user.email, 
                password: user.password || "" 
              });
              setOpen(true);
            }}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
