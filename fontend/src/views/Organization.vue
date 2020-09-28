<template>
  <div id="app">
    <el-card class="box-card">
      <el-button type="success" @click="handleAdd">Add</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Name" prop="name" width="180">
        </el-table-column>
        <el-table-column label="Type" prop="type_meaning" width="180">
        </el-table-column>
        <el-table-column label="Parent" prop="parent" width="180">
        </el-table-column>
        <el-table-column label="Users" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="go(scope.$index, scope.row)">Users</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="180">
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
      <el-pagination
        :total="total"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"/>
      
      <el-dialog title="Orgnization" :visible.sync="dialogFormVisible" style="text-align:left;">
        <el-form :model="form" label-position="right" label-width="120px">
          <el-form-item label="Name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Type">
              <el-select v-model="form.type" placeholder="Select">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="Parent">
            <el-select v-model="form.pid" placeholder="Select">
              <el-option
                v-for="item in tableData"
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

import orgRequest from '@/api/organization'
import initData from '@/mixins/initData'

export default {
  mixins: [initData],
  data() {
    return {
      dialogFormVisible: false,
      operationType: '',
      tableData: [],
      form: {
        name: '',
        type: '',
        pid: null
      },
      types: [
        {
          label: 'Company',
          value: 'company'
        },
        {
          label: 'Department',
          value: 'department'
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const query = this.query
      const value = query.value
      const sort = 'id'
      this.params = { page: this.page, size: this.size, ordering: sort }
      if (value) { this.params['search'] = value }
      orgRequest.list(this.params).then(res => {
        this.tableData = res.results
        this.total = res.count
      })
    },
    handleAdd() {
      this.operationType = 'add'
      this.form = {
        name: '',
        type: '',
        pid: null
      }
      this.dialogFormVisible = true
    },
    confirmAdd() {
      this.dialogFormVisible = false
      orgRequest.add(this.form).then(() => {
        this.init()
        this.$message({
          type: 'success',
          message: 'Add completed'
        })
      })
    },
    handleEdit(index, row) {
      this.operationType = 'edit'
      this.form = row
      this.dialogFormVisible = true
    },
    confirmEdit() {
      this.dialogFormVisible = false
      orgRequest.update(this.form.id, this.form).then(() => {
        this.init()
        this.$message({
          type: 'success',
          message: 'Edit completed'
        })
      })
    },
    handleDelete(index, row) {
      this.$confirm('This will permanently delete the Orgnization. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        orgRequest.del(row.id).then(res => {
          console.log(res)
          this.init()
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
    go(index, row) {
      this.$router.push({ name: 'User', query:{ org_id: row.id }});
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
