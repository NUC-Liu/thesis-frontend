<template>
    <div id="app">
        <v-tabs>
            <v-tab>论文选题列表</v-tab>
        </v-tabs>
        <v-app id="inspire">
            <v-card>
                <v-card-title>
                    <v-btn large color="primary">确认选择</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="theses"
                        :single-select="true"
                        :search="search"
                        item-key="thesis_no"
                        show-select
                        class="elevation-1"
                        loading
                >
                </v-data-table>
            </v-card>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "ThesisList",
        data () {
            return {
                search: '',
                headers: [
                    { text: '编号', value: 'thesis_no',sortable: true },
                    { text: '论文标题', value: 'thesis_title' },
                ],
                theses: [
                    {
                        thesis_no: '002',
                        thesis_title: "002毕业设计管理系统"
                    },
                    {
                        thesis_no: '001',
                        thesis_title: "001毕业设计管理系统"
                    },
                    {
                        thesis_no: '005',
                        thesis_title: "005毕业设计管理系统"
                    },
                ],
            }
        },
    }
</script>

<style scoped>

</style>