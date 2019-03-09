<template>
<div class="row">
    <div class='col-md-4 offset-md-8'>
        <div class="form-group">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
    </div>
  <div class="col-md-12">
    <div class="table-responsive">
      <table class="table table-striped table-bordered" style="width:100%">
          <thead width="400px">
              <tr>
                <th scope="col" v-for="column in columns" @click="sort(column)" :key="column" >{{column}} </th>
              </tr>
          </thead>
          <tbody>

            <tr v-for="(item, index) in (sortedActivity, filteredList)" v-if="data.length > 0">
                <td v-for="col in columns"  :key="col" v-html="itemValue(item, col)" >{{itemValue(item, col)}}</td>

                <td v-if="actions.length > 0" v-for="(action) in actions" > 
                    <button :class="action.class" v-bind="$attrs" @click="handleCallback(action.callback, filterObject(item, action.args))"> {{ action.text }} </button>
                </td>
            </tr>
            <tr v-if="filteredList.length === 0">
                <td v-if='search.length > 0' colspan="100" style='text-align: center'>
                    Nothing was found for {{search}}
                </td>
                <td v-else style='text-align: center' colspan="100">
                    <Loader v-if="loading" :showFull="false"/>
                    <br>
                    <span v-if="loading">
                        Please wait...
                    </span>
                    <span v-else>
                        No data yet!
                    </span>
                </td>
            </tr>
          </tbody>
      </table>
    </div>
    <div class="float-left" v-if='data.length > 0'>Page: {{ currentPage }} of {{totalPages}}</div>
    <div class="float-right">
        <button @click="prevPage" class="btn btn-outline-info btn-sm" v-bind:class="disable"><i class="fas fa-arrow-left"></i> Previous</button> &nbsp; &nbsp; &nbsp;
        <button @click="nextPage" class="btn btn-outline-info btn-sm" v-bind:class="disableNext">Next <i class="fas fa-arrow-right"></i></button>
    </div>
  </div>
</div>
</template>

<script>
/*eslint-disable*/
import axios from 'axios';
import Loader from "../Loader/Loader";

export default {
    inheritAttrs: false,
  data: () => ({
    currentSort:'name',
    currentSortDir:'asc',
    search: '',
    searchSelection: '',
    perPage: 12,
    currentPage: 1,
    disable: '',
    disableNext: '',
  }),
   props: {
      columns: Array,
      data: Array,
      actions: Array,
      loading: Boolean,
      type: {
        type: String, // striped | hover
        default: 'Striped'
      },
      handler: '',
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''
      },
    },
    components: {Loader},

  methods:{
    filterObject(haystack, needle = []) {
        // console.log(haystack);
        let data = [];
        if (needle.length === 0 || haystack.length == 0) return [];

        needle.forEach((key) => {
            if (haystack.hasOwnProperty(key))
                data.push(haystack[key]);
        });
        return data;
    },
    handleCallback(callback, args) {
        this.handler(callback, args); 
    },   
    sort:function(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.perPage) < this.data.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    },
    hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
    },
    itemValue (item, column) {
    return item[column]
    },
  },

  computed: {
    sortedActivity:function() {
      return this.data.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.perPage;
        let end = this.currentPage*this.perPage;
        if(index >= start && index < end) return true;
      });
    },

    filteredList () {
      return this.data.filter((val) => {
        var match = false;
        let keys = Object.keys(val);

        for (var i = 0; i < keys.length; i++) {
            match = val[keys[i]].toLowerCase().match(this.search.toLowerCase());
            if (match) 
                break; 
        }
        return match;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.perPage;
        let end = this.currentPage*this.perPage;
        if(index >= start && index < end) return true;
      });
    },
    tableClass () {
        return `table-${this.type}`
      },
        totalPages () {
            return Math.ceil(this.data.length / this.perPage) * 1;
        },
        action (){
            if (data.Actions.length == 0) return;

            data.Actions.forEach(({text: text}) => {
                console.log(text);
            });
        }
      },
    created (){
        if( this.currentPage === 1){
            this.disable = 'disabled'
        }
        if((this.currentPage*this.perPage) < this.data.length)  this.disableNext = 'disabled';
    }
}
</script>

<style scoped>
th {
  cursor:pointer;
  /* width: 500px !important; */
  white-space: nowrap;
}

tr {
  white-space: nowrap;
}
.float-left{
    margin-top: 20px;
}

.float-right{
    margin-top: 20px
}

</style>