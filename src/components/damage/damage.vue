<template>
  <div style="padding: 50px">
    <div style="margin: 0 auto; width: 600px">
      <v-container class="grey lighten-5">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select :items="items" label="Type Equipement"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select :items="items" label="Equipement"></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">Damage IT</div>

                  <v-list-item-title class="text-h5 mb-1"> </v-list-item-title>
                  <v-list-item-subtitle
                    >les damage pour les equipement IT
                    seulement</v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                  <v-img
                    contain
                    lazy-src="../../assets/technical-support.png"
                    max-height="100"
                    max-width="150"
                    src="../../assets/technical-support.png"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn outlined rounded text> Button </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-card class="mx-auto" max-width="344">
              <v-img src="../../assets/1624008.png" height="160px"></v-img>

              <v-card-title> Damage Technique </v-card-title>

              <v-card-subtitle>
                les damage pour les equipement Technique
                seulement</v-card-subtitle
              >

              <v-card-actions>
                <v-btn color="orange lighten-2" text> Explore </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
};
</script>
