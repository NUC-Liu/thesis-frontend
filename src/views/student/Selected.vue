<template>
    <div id="app">
        <v-tabs>
            <v-tab>已选论文列表</v-tab>
        </v-tabs>
        <v-app id="inspire">
            <v-card>
                <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="theses"
                        item-key="thesis_no"
                        class="elevation-1"
                >
                </v-data-table>
            </v-card>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "Selected",
        data () {
            return {
                search: '',
                headers: [
                    { text: '编号', value: 'thesis_no',sortable: true },
                    { text: '论文标题', value: 'thesis_title' },
                    { text: '任务书', value: 'task_of_research' },
                    { text: '开题报告', value: 'thesis_proposal' },
                    { text: '毕业设计书', value: 'thesis_final' },
                    { text: '导师信息', value: 'teacher' },
                    { text: '周报', value: 'weekly' },
                ],
                theses: [
                    {
                        thesis_no: '002',
                        thesis_title: "002毕业设计管理系统",
                        task_of_research: "",
                        thesis_proposal: "",
                        thesis_final: "",
                        teacher: "",
                        weekly: ""
                    },

                ],
            }
        },
    }
</script>

<style scoped>

</style>