<template>
  <div id="app">
    <el-card class="box-card">
      <el-button type="success" @click="handleAdd">Add</el-button>
      <el-button type="success" @click="home" style="float: right">Home</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Organization Name" prop="organization_name" width="180">
        </el-table-column>
        <el-table-column label="Name" prop="name" width="180">
        </el-table-column>
        <el-table-column label="First Name" prop="first_name" width="180">
        </el-table-column>
        <el-table-column label="Last Name" prop="last_name" width="180">
        </el-table-column>
        <el-table-column
          label="Operations">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-dialog title="User" :visible.sync="dialogFormVisible" style="text-align:left;">
        <el-form :model="form" label-position="right" label-width="120px">
          <el-form-item label="Name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="First Name">
            <el-input v-model="form.first_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Last Name">
            <el-input v-model="form.last_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Orgnization">
            <el-select v-model="form.organization" placeholder="Select">
              <el-option
                v-for="item in orgs"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" v-show="operationType === 'edit'" @click="confirmEdit">Confirm</el-button>
          <el-button type="primary" v-show="operationType === 'add'" @click="confirmAdd">Confirm</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>

</template>

<script>

import userRequest from '@/api/user'
import orgRequest from '@/api/organization'

export default {
  data() {
    return {
      dialogFormVisible: false,
      operationType: '',
      orgs: [],
      tableData: [],
      form: {
        name: '',
        first_name: '',
        last_name: '',
        password: '',
        email: '',
        organization: null
      }
    }
  },
  mounted() {
    this.listUsers()
  },
  methods: {
    listUsers() {
      userRequest.list(this.$route.query.org_id).then(res => {
        this.tableData = res
        console.log(this.tableData)
      })
    },
    handleAdd() {
      this.operationType = 'add'
      this.form = {
        name: '',
        first_name: '',
        last_name: '',
        password: '',
        email: '',
        organization: null
      }
      this.loadOrg()
      this.dialogFormVisible = true
    },
    confirmAdd() {
      this.dialogFormVisible = false
      userRequest.add(this.form).then(() => {
        this.listUsers()
        this.$message({
          type: 'success',
          message: 'Add completed'
        })
      })
    },
    handleEdit(index, row) {
      this.operationType = 'edit'
      this.loadOrg()
      this.form = row
      this.dialogFormVisible = true
    },
    confirmEdit() {
      this.dialogFormVisible = false
      userRequest.update(this.form.id, this.form).then(() => {
        this.listUsers()
        this.$message({
          type: 'success',
          message: 'Edit completed'
        })
      })
    },
    handleDelete(index, row) {
      this.$confirm('This will permanently delete the User. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        userRequest.del(row.id).then(res => {
          console.log(res)
          this.listUsers()
          this.$message({
            type: 'success',
            message: 'Delete completed'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    loadOrg() {
      orgRequest.list().then (res => {
        this.orgs = res
      })
    },
    home() {
      this.$router.push('/');
    }
  }
}
</script>

<style>
.box-card {
  margin: 0 auto;
  width: 60%;
}
</style>
