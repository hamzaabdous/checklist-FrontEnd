<template>
  <div style="padding: 5px; padding-top: 8%">
    <v-data-table
      :headers="headers"
      :items="roles"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>roles</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#99A799"
                class="mb-2 btn white--text"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left> mdi-account-multiple-plus </v-icon>
                Add
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="id"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-col class="d-flex" cols="12" sm="12">
                        <v-select
                          :items="departements"
                          item-text="name"
                          item-value="id"
                          v-model="editedItem.departement.id"
                          label="departements"
                        ></v-select>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close(item)">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save(editedItem)">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize()"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "id", align: "start", value: "id", sortable: true },
      { text: "name", value: "name", sortable: true },
      { text: "departement", value: "departement.name", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    roles: [],
    departements: [],
    isAdd: true,
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      departement: {
        id: "",
      },
    },
    defaultItem: {
      id: "",
      name: "",
      departement: {
        id: "",
      },
    },
  }),
  mounted() {
    document.title = "role";

    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getroles", "getdepartements"]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.setRolesAction().then(() => {
        this.roles = [...this.getroles];
        console.log(this.roles);
      });
      this.setDepartementsAction().then(() => {
        this.departements = [...this.getdepartements];
        console.log("dkhal depart list", this.departements);
      });
    },
    ...mapActions([
      "setRolesAction",
      "editRoleAction",
      "deleteRoleAction",
      "addRoleAction",
      "setDepartementsAction",
    ]),

    editItem(item) {
      this.editedIndex = this.roles.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      console.log("item :", item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteRoleAction(this.editedIndex).then(() => {
        this.roles = this.getroles;
      });
      this.closeDelete();
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save(editedItem) {
      if (this.editedIndex == -1) {
        console.log("add");
        this.addRoleAction(editedItem).then(() => {
          this.roles = [...this.roles];
        });
      } else {
        console.log("edite");

        this.editRoleAction(editedItem).then(() => {
          console.log("edite role name", editedItem.name);
          this.roles = this.getroles;
        });
      }

      this.close();
    },
  },
};
</script>
