<template>
<div>
  <br>
  <h1>Guests List</h1>
  <v-app>
    <div class="text-xs-center">
      <v-btn round color="green" dark @click = 'getGuests'>Get Guests</v-btn>
    </div>
    <template>
      <v-card>
        <v-card-title>
          Guests List
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table
            v-bind:headers="headers"
            v-bind:items="guests"
            v-bind:search="search"
          >
          <template slot="items" slot-scope="props">
            <td>
              <v-edit-dialog
                lazy
              > {{ props.item.name }}
                <v-text-field
                  slot="input"
                  label="Edit"
                  v-model="props.item.name"
                  single-line
                  counter
                  :rules="[max25chars]"
                ></v-text-field>
              </v-edit-dialog>
            </td>
            <td class="text-xs-right">{{ props.item.side }}</td>
            <td class="text-xs-right">{{ props.item.attendance }}</td>
            <td class="text-xs-right">
              <v-edit-dialog
                @open="tmp = props.item.checkin"
                @save="props.item.checkin = tmp || props.item.checkin"
                large
                lazy
              >
                <div>{{ props.item.checkin }}</div>
                <div slot="input" class="mt-3 title">Update Checkin Status</div>
                <v-text-field
                  slot="input"
                  label="Edit"
                  v-model="tmp"
                  single-line
                  counter
                  autofocus
                  :rules="[max25chars]"
                ></v-text-field>
              </v-edit-dialog>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
    </template>
  </v-app>
</div>
</template>

<script>
import GuestService from '@/services/GuestService'

export default {
  name: 'Guest',
  data () {
    return {
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Side', value: 'side' },
        { text: 'Attendance', value: 'attendance' },
        { text: 'Checkin', value: 'checkin' }
      ],
      guests: []
    }
  },
  methods: {
    getGuests: async function () {
      let res = await GuestService.getGuests()
      this.guests = res.data
    }
  }
}
</script>