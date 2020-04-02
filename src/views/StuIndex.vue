<template>
    <div id="app">
        <v-app id="inspire">
            <!--左边导航栏-->
            <v-navigation-drawer
                    permanent
                    v-model="drawer"
                    :clipped="$vuetify.breakpoint.lgAndUp"
                    app
            >
                <v-list dense>
                    <template v-for="item in items">

                        <v-layout
                                v-if="item.heading"
                                :key="item.heading"
                                row
                                align-center
                        >
                            <v-flex xs6>
                                <v-subheader v-if="item.heading">
                                    {{ item.heading }}
                                </v-subheader>
                            </v-flex>
                            <v-flex
                                    xs6
                                    class="text-xs-center"
                            >
                                <a
                                        href="#!"
                                        class="body-2 black--text"
                                >EDIT</a>
                            </v-flex>
                        </v-layout>
                        <!--带二级菜单-->
                        <v-list-group
                                v-else-if="item.children"
                                :key="item.text"
                                v-model="item.model"
                                :prepend-icon="item.icon"
                                append-icon="keyboard_arrow_down"
                                class="text-left"
                        >
                            <!--二级菜单中的父标签-->
                            <template v-slot:activator>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ item.text }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                            <!--二级菜单中遍历子标签-->
                            <v-list-item
                                    v-for="(child, i) in item.children"
                                    :key="i"
                                    :to="item.path + child.path"
                            >
                                <v-list-item-action v-if="child.icon">
                                    <v-icon>{{ child.icon }}</v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ child.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                        <!--不带二级菜单-->
                        <v-list-item
                                v-else
                                :key="item.text"
                                :to="item.path"
                                class="text-left"
                        >
                            <v-list-item-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list>
            </v-navigation-drawer>
            <!--顶部信息栏-->
            <v-app-bar
                    :clipped-left="$vuetify.breakpoint.lgAndUp"
                    app
                    color="blue darken-3"
                    dark
            >
                <v-toolbar-title
                        style="width: 300px"
                        class="ml-0 pl-3"
                >
                    <!--<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
                    <span class="hidden-sm-and-down">{{title}}</span>
                </v-toolbar-title>
                <v-text-field
                        flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="search"
                        label="Search"
                        class="hidden-sm-and-down"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>apps</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>notifications</v-icon>
                </v-btn>
                <v-btn
                        icon
                        large
                >
                    <v-avatar
                            size="32px"
                            item
                    >
                        <v-img
                                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                                alt="Vuetify"
                        >
                        </v-img></v-avatar>
                </v-btn>
            </v-app-bar>
            <!--内容区-->
            <v-content>
                <v-container
                        fluid
                        fill-height
                >
                    <v-layout
                            align-center
                            justify-center
                    >

                        <router-view/>
                    </v-layout>
                </v-container>
            </v-content>

            <v-dialog
                    v-model="dialog"
                    width="800px"
            >
                <v-card>
                    <v-card-title class="grey darken-2">
                        Create contact
                    </v-card-title>
                    <v-container grid-list-sm>
                        <v-layout
                                row
                                wrap
                        >
                            <v-flex
                                    xs12
                                    align-center
                                    justify-space-between
                            >
                                <v-layout align-center>
                                    <v-avatar
                                            size="40px"
                                            class="mr-3"
                                    >
                                        <img
                                                src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                                                alt=""
                                        >
                                    </v-avatar>
                                    <v-text-field
                                            placeholder="Name"
                                    ></v-text-field>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field
                                        prepend-icon="business"
                                        placeholder="Company"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-text-field
                                        placeholder="Job title"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        prepend-icon="mail"
                                        placeholder="Email"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        type="tel"
                                        prepend-icon="phone"
                                        placeholder="(000) 000 - 0000"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        prepend-icon="notes"
                                        placeholder="Notes"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-btn
                                text
                                color="primary"
                        >More</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                                text
                                color="primary"
                                @click="dialog = false"
                        >Cancel</v-btn>
                        <v-btn
                                text
                                @click="dialog = false"
                        >Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-app>
    </div>
</template>


<script>
    export default {
        data: () => ({
            title: '毕业设计管理系统 学生端',
            dialog: false,
            drawer: null,
            menuMap: {},
            items: [
                { icon: 'home', text: '首页', path: '/stuhome' },
                { icon: 'announcement', text: '公告通知', path: '/announcement' },
                {
                    icon: 'library_books',
                    //'icon-alt': 'library_books',
                    text: '论文管理',
                    model: false,
                    path: 'thesis',
                    children: [
                        { icon: 'list', text: '论文列表', path: '/list' },
                        { icon: 'playlist_add_check', text: '已选论文', path: '/selected' },
                        { icon: 'calendar_today', text: '周报记录', path: '/weekly' },
                    ],
                },
                { icon: 'settings', text: '设置', path: '/setting' },
                { icon: 'help', text: '帮助', path: 'help' },
            ],
        }),

    }
</script>

<style scoped>

</style>