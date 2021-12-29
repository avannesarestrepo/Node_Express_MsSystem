const MongoLib = require("../lib/mongo");

const UserXProjectService = require("../serviceModules/UserXProject");
const UserXprojectServices = new UserXProjectService();

class ProjectService{
    constructor(){
        this.collection = "project";
        this.mongoDB = new MongoLib();
    }

    async getProjects({ tags }){
        const query = tags && {$in : { tags }};
        const projects = await this.mongoDB.getAll(this.collection, query);
        for (let i = 0; i < projects.length; i++) {
            const element = projects[i];
            //Cliente
            var userId = element.idCliente;
            if(userId != null && userId != ""){
                var users = await UserXprojectServices.getUser( userId );
                projects[i].Cliente = users;
            }
            //Lider
            userId = element.idLider;
            if(userId != null && userId != ""){
                users = await UserXprojectServices.getUser(userId);
                projects[i].Lider = users;
            }
            //Responsable
            userId = element.idResponsable
            if(userId != null && userId != ""){
                users = await UserXprojectServices.getUser(userId);
                projects[i].Responsable = users;
            }
            //Soporte
            userId = element.idSoport
            if(userId != null && userId != ""){
                users = await UserXprojectServices.getUser(userId);
                projects[i].Soporte = users;
            }
        }
        
        return projects || [];
    }

    async getProject({ projectId }){
        const project = await this.mongoDB.get(this.collection, projectId);
        return project || {};
    }

    async createProject({ project }){
        const createProject = await this.mongoDB.create(this.collection, project);
        return createProject;
    }

    async updateProject({ projectId, project} = { } ){
        const updateProject = await this.mongoDB.update(this.collection, projectId, project);
        return updateProject;
    }

    async deleteProject({ projectId }){
        const deleteProject = await this.mongoDB.delete(this.collection, projectId);
        return deleteProject;
    }
}

module.exports = ProjectService;