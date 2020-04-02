<template>
    <div id="app">
        <v-app id="inspire">
            <v-container>
                <v-row dense>
                    <v-col cols="12">
                        <v-card>
                            <v-card-text class="text-left headline font-weight-bold">各位同学，今天开始，中期检查开始了。大家需要做的事情如下： 1.认真填写【毕业设计中期检查表.doc
                                】 2.提交内容： (1)中期答辩PPT(项目完成情况说明). (2)项目源码. (3)项目运行视频. (项目完成情况使用PPT
                                完成，其中包含项目功能说明，技术说明，完成情况说明，完成项目功能截图，目前存在的问题等。) 3.中期检查时间
                                ：2020年3月27日~4月5日
                            </v-card-text>
                            <v-card-actions>
                                <v-row justify="end" no-gutters class="font-weight-light">Liu 发表于 2020-1-1 8:00</v-row>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card>
                            <v-card-text class="text-left headline font-weight-bold">各位同学，收到学校通知，有三件事通知大家： 1.每周周一到周三之间填毕设周报。注意是每周周一到周三。 2.最晚在2月4号20:00之前填写并提交【毕业设计进展报告】，提交给自己的辅导老师。
                                3.每天登录校企通完成签到。注意是每天。
                            </v-card-text>
                            <v-card-actions>
                                <v-row justify="end" no-gutters class="font-weight-light">Liu 发表于 2020-1-1 8:00</v-row>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card>
                            <v-card-text class="text-left headline font-weight-bold">各位同学，近期疫情严重，为了确保大家和家人的安全，维信的老师这几天会通过QQ和电话与大家进行联系，问到的问题请如实回复。假期期间，尽量避免外出，聚会，做好防护措施。
                            </v-card-text>
                            <v-card-actions>
                                <v-row justify="end" no-gutters class="font-weight-light">Liu 发表于 2020-1-1 8:00</v-row>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
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