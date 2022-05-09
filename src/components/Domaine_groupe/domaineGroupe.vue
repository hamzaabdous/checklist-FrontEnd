<template>
  <div style="padding: 5px; padding-top: 8%">
    <v-data-table
      :headers="headers"
      :items="domaineGroupes"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>DOMAINEGROUPE</v-toolbar-title>
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
                        v-model="editedItem.name"
                        label="name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.departement"
                        label="departement"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.domaine.id"
                        label="domaine"
                      ></v-text-field>
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
          <v-dialog v-model="dialogDelete" max-width="600px">
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
      { text: "departement", value: "departement", sortable: true },
      { text: "domaine", value: "domaine.name", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    domaineGroupes: [],
    isAdd: true,
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      departement: "",
      domaine: {
        id: "",
      },
    },
    defaultItem: {
      id: "",
      name: "",
      departement: "",
      domaine: {
        id: "",
      },
    },
  }),
  mounted() {
    document.title = "domaineGroupes";

    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getdomaineGroupes"]),
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
      this.setDOMAINEGROUPESAction().then(() => {
        this.domaineGroupes = [...this.getdomaineGroupes];
        console.log(this.domaineGroupes);
      });
    },
    ...mapActions([
      "setDOMAINEGROUPESAction",
      "editDOMAINEGROUPEAction",
      "deleteDOMAINEGROUPEAction",
      "addDOMAINEGROUPEAction",
    ]),

    editItem(item) {
      this.editedIndex = this.domaineGroupes.indexOf(item) + 1;
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
      this.deleteDOMAINEGROUPEAction(this.editedIndex).then(() => {
        this.domaineGroupes = this.getdomaineGroupes;
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
        console.log("add", editedItem);
        this.addDOMAINEGROUPEAction(editedItem).then(() => {
          this.domaineGroupes = [...this.domaineGroupes];
        });
      } else {
        console.log("edite");

        this.editDOMAINEGROUPEAction(editedItem).then(() => {
          this.domaineGroupes = this.getdomaineGroupes;
        });
      }

      this.close();
    },
  },
};
</script>
