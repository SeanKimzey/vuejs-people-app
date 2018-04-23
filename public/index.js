/* global Vue, VueRouter, axios */

var SamplePage = {
  template: "#sample-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
    };
  },
  created: function() {

  },
  methods: {},
  computed: {}
};


var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "People and their bios:",
      people: [],
      newPerson: {name: "", bio: "", bioVisible: true},
      errors: [],
      searchName: "",
      searchBio: "",
      sortAttribute: "name",
      sortAsc: false
    };
  },
  created: function() {
    axios.get("http://localhost:3000/people").then(function(response) {
      this.people = response.data;
    }.bind(this));
  },
  methods: {
    addPerson: function() {

      var params = {
        inputName: this.newPerson.name,
        inputBio: this.newPerson.bio
      };
      axios.post("/people", params).then(function(response) {
        this.people.push(response.data);
        this.newPerson = {name: "", bio: "", bioVisible: true};
        this.errors = [];
      }.bind(this)).catch(function(error) {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      }.bind(this));

    },
    removePerson: function(thePerson) {
      var index = this.people.indexOf(thePerson);
      this.people.splice(index, 1);
    },
    toggleBioVisible: function(thePerson) {
 
      thePerson.bioVisible = !thePerson.bioVisible;
 
    },
    isValidPerson: function(inputPerson) {
      console.log('running isValidPerson');
      var validBio = inputPerson.bio.toLowerCase().includes(this.searchBio.toLowerCase());
      var validName = inputPerson.name.toLowerCase().includes(this.searchName.toLowerCase());
      return validBio && validName;
    },
    setSortAttribute: function(inputAttribute) {
      this.sortAttribute = inputAttribute;
      this.sortAsc = !this.sortAsc;
    }
  },
  computed: {
    sortedPeople: function() {
      return this.people.sort(function(person1, person2) {
        var person1Attribute = person1[this.sortAttribute].toLowerCase();
        var person2Attribute = person2[this.sortAttribute].toLowerCase();
        if (this.sortAsc) {
          return person1Attribute.localCompare(person2Attribute);
        } else {
          return person2Attribute.localCompare(person1Attribute);
        }
      }.bind(this));
    }
  }
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/sample", component: SamplePage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});