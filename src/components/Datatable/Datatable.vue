<template>
    <vuetable ref="vuetable"
              :api-mode="false"
              :data="data"
              :fields="fields"
              :per-page="perPage"
              :data-manager="dataManager"
              pagination-path="pagination"
              @vuetable:pagination-data="onPaginationData"
    ></vuetable>
</template>

<script>
    import Vuetable from 'vuetable-2';

    export default {
        name: "Datatable",
        props: ['fields', 'data', 'perPage'],
        components: {
            Vuetable
        },
        watch: {
            data(newVal, oldVal) {
                this.$refs.vuetable.refresh();
            }
        },
        methods: {
            onPaginationData(paginationData) {
                this.$refs.pagination.setPaginationData(paginationData);
            },
            onChangePage(page) {
                this.$refs.vuetable.changePage(page);
            },
            dataManager(sortOrder, pagination) {
                if (this.data.length < 1) return;

                let local = this.data;

                // sortOrder can be empty, so we have to check for that as well
                if (sortOrder.length > 0) {
                    window.console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
                    local = _.orderBy(
                        local,
                        sortOrder[0].sortField,
                        sortOrder[0].direction
                    );
                }

                pagination = this.$refs.vuetable.makePagination(
                    local.length,
                    this.perPage
                );
                window.console.log('pagination:', pagination);
                let from = pagination.from - 1;
                let to = from + this.perPage;

                return {
                    pagination: pagination,
                    data: _.slice(local, from, to)
                };
            },
            onActionClicked(action, data) {
                window.console.log("slot actions: on-click", data.name);
            }
        }
    }
</script>

<style scoped>

</style>