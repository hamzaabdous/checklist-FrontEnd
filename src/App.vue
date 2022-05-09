<template>
  <v-card class="mx-auto overflow-hidden" height="765">
    <v-app-bar color="#D3E4CD" style="border-bottom: 0px solid #666666">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img
          contain
          lazy-src="./assets/TangerAlliance.png"
          max-height="100"
          max-width="150"
          src="./assets/TangerAlliance.png"
        ></v-img>
      </v-toolbar-title>
      <p><b>Checklist</b></p>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      width="15em"
      style="background-color: #d3e4cd"
    >
      <v-list style="padding: 0px; align-items: center" nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-img
            contain
            lazy-src="./assets/TangerAlliance.png"
            max-height="220"
            max-width="250"
            src="./assets/TangerAlliance.png"
          ></v-img>
          <v-list>
            <v-list-group
              v-for="item in listDrawerRouter"
              :key="item.id"
              v-model="item.active"
              :prepend-icon="item.action"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    <h2>{{ item.name }}</h2>
                  </v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="item in listDrawerChildRouter"
                :key="item.id"
                link
                :to="item.ROUTE"
                class="sideBarItem"
              >
                <v-list-item class="test">
                  <v-list-item-content>{{ item.name }}</v-list-item-content>
                </v-list-item>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app style="background-color: #fef5ed">
      <router-view />
    </v-app>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      listDrawerRouter: [{ id: 1, name: "Gestion" }],
      listDrawerChildRouter: [
        { id: 1, name: "user", ROUTE: "/user" },
        { id: 2, name: "Departement", ROUTE: "/Departement" },
        { id: 3, name: "Role", ROUTE: "/Role" },
        { id: 4, name: "domaineGroupe", ROUTE: "/domaineGroupe" },
        { id: 5, name: "damageType", ROUTE: "/damageType" },
      ],
      users: [],
      show: true,
    };
  },
  mounted() {
    document.title = "Dashboard";

    //  this.initialize();
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
  watch: {},
  methods: {
    initialize() {
      this.setUsersAction().then(() => {
        this.users = [...this.getUsers];
        console.log(this.users);
      });
    },
    ...mapActions([
      "setUsersAction",
      "editUserAction",
      "deleteUserAction",
      "addUserAction",
    ]),
  },
};
</script>
