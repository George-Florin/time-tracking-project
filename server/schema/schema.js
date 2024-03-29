const Project = require("../models/Project");
const Time = require("../models/Time");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const TimeType = new GraphQLObjectType({
  name: "Time",
  fields: () => ({
    id: { type: GraphQLID },
    activity: { type: GraphQLString },
    date: { type: GraphQLString },
    duration: { type: GraphQLString },
    projectId: { type: GraphQLID },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    times: {
      type: new GraphQLList(TimeType),
      resolve(parent, args) {
        return Time.find({ projectId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    times: {
      type: new GraphQLList(TimeType),
      args: { projectId: { type: GraphQLID } },
      resolve(parent, args) {
        return Time.find(args.projectId);
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //Add time
    addTime: {
      type: TimeType,
      args: {
        activity: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        duration: { type: GraphQLNonNull(GraphQLString) },
        projectId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const time = new Time({
          activity: args.activity,
          date: args.date,
          duration: args.duration,
          projectId: args.projectId,
        });

        return time.save();
      },
    },
    //Delete time
    deleteTime: {
      type: TimeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Time.findByIdAndRemove(args.id);
      },
    },
    //Add project
    addProject: {
      type: ProjectType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const project = new Project({
          title: args.title,
          description: args.description,
        });

        return project.save();
      },
    },
    //Delete project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },
    //Update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
