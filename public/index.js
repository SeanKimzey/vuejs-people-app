/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "People and their bios",
      people :[
        {
          name: "Sean",
          bio: "He records music and is learning how to code",
          bioVisible: true
        },
        {
          name: "Mary Kate",
          bio: "She is cool",
          bioVisible: true
        }
      ], 
      newPerson: {name: "", bio: "", biovisible: true}
    };
  },
  created: function() {},
  methods: {
    addPerson: function() {
      this.people.push(this.newPerson);
      this.newPerson = {name: "", bio: "", bioVisible: true};
    },
    removePerson: function( thePerson) {
      var index = this.people.indexOf(thePerson);
      this.people.splice(index, 1);


    },
    toggleBioVisible: function(thePerson) {
      thePerson.bioVisible = !thePerson.bioVisible;

    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
