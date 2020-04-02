<template>
    <div id="app">
        <v-app id="inspire">
            <div>
                <template v-for="anno in annos">
                    <v-alert
                            text
                            color="info"
                            icon="info"
                            :key="anno"
                    >
                        <h3>{{anno.context}}</h3>

                        <v-divider
                                class="my-4 info"
                                style="opacity: 0.22"
                        ></v-divider>

                        <v-row
                                align="center"
                                no-gutters
                        >
                            <v-col class="grow">{{anno.editor}} | {{anno.gmt_create}}</v-col>
                            <v-spacer></v-spacer>
                            <v-col class="grow">
                                <v-btn
                                        color="info"
                                        outlined
                                >
                                    收到
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </template>
            </div>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "announcement",
        data: () => ({
            annos: [
                {
                    context: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容',
                    editor: 'liu',
                    gmt_create: '2020-1-1'
                },
                {
                    context: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容',
                    editor: 'liu',
                    gmt_create: '2020-1-1'
                },
                {
                    context: '公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容',
                    editor: 'liu',
                    gmt_create: '2020-1-1'
                }
            ]
        })
    }
</script>

<style scoped>

</style>