import { useState } from "react";
import {
    FolderPlus,
    Search,
    Plus,
    Building2,
    UserRound,
    Mail,
    Phone,
    X,
} from "lucide-react";
import { useEffect } from "react";
import api from "../Api/api";
import "./project.css";

const emptyForm = {
    projectName: "",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
};

export default function Projects() {
    const [formData, setFormData] = useState(emptyForm);
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await api.get("/projects/Retrive");
                setProjects(response.data);
                setError("");
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load projects. Please check the backend."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/projects/Add", formData);

            setProjects((prev) => [response.data.project, ...prev]);
            setFormData(emptyForm);
            setIsFormOpen(false);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save project. Please try again."
            );
        }
    };


    const handleCloseForm = () => {
        setIsFormOpen(false);
        setFormData(emptyForm);
    };

    const filteredProjects = projects.filter((project) =>
        [
            project.projectName,
            project.companyName,
            project.contactPerson,
        ]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="projects-page">
            <div className="projects-header">
                <div>
                    <h1>Projects</h1>
                    <p>Manage your projects and their invoices.</p>
                </div>

                <button
                    type="button"
                    className="create-project-btn"
                    onClick={() => setIsFormOpen(true)}
                >
                    <Plus size={18} />
                    <span>Add Project</span>
                </button>
            </div>

            {/* Add Project Modal */}
            {isFormOpen && (
                <div
                    className="project-modal-overlay"
                    onClick={handleCloseForm}
                >
                    <section
                        className="project-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="project-form-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="project-modal-header">
                            <div className="project-section-heading">
                                <div className="project-heading-icon">
                                    <FolderPlus size={20} />
                                </div>

                                <div>
                                    <h2 id="project-form-title">Add New Project</h2>
                                    <p>Enter the project and client details.</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="project-modal-close"
                                onClick={handleCloseForm}
                                aria-label="Close form"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="project-form-grid">
                                <div className="project-field">
                                    <label htmlFor="projectName">Project Name *</label>
                                    <div className="project-input-wrapper">
                                        <FolderPlus size={17} />
                                        <input
                                            id="projectName"
                                            name="projectName"
                                            value={formData.projectName}
                                            onChange={handleChange}
                                            placeholder="Website Development"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="project-field">
                                    <label htmlFor="companyName">Company Name *</label>
                                    <div className="project-input-wrapper">
                                        <Building2 size={17} />
                                        <input
                                            id="companyName"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="Company name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="project-field">
                                    <label htmlFor="contactPerson">Contact Person *</label>
                                    <div className="project-input-wrapper">
                                        <UserRound size={17} />
                                        <input
                                            id="contactPerson"
                                            name="contactPerson"
                                            value={formData.contactPerson}
                                            onChange={handleChange}
                                            placeholder="Contact person's name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="project-field">
                                    <label htmlFor="email">Email Address *</label>
                                    <div className="project-input-wrapper">
                                        <Mail size={17} />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="client@company.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="project-field">
                                    <label htmlFor="phone">Phone Number</label>
                                    <div className="project-input-wrapper">
                                        <Phone size={17} />
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone number"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="project-form-actions">
                                <button
                                    type="button"
                                    className="project-cancel-btn"
                                    onClick={handleCloseForm}
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="create-project-btn">
                                    <Plus size={18} />
                                    <span>Save Project</span>
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}

            {/* Projects Listing */}
            <section className="project-list-card">

                {loading && <p>Loading projects...</p>}

                {error && <p role="alert">{error}</p>}

                <div className="project-list-header">
                    <div>
                        <h2>All Projects</h2>
                        <p>{projects.length} {projects.length === 1 ? "project" : "projects"} created</p>
                    </div>

                    <div className="projects-search">
                        <Search size={18} />
                        <input
                            type="search"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search projects"
                        />
                    </div>
                </div>

                <div className="projects-table-wrapper">
                    <table className="projects-table">
                        <thead>
                            <tr>
                                <th scope="col">Project Name</th>
                                <th scope="col">Company</th>
                                <th scope="col">Contact Person</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Created Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <tr key={project._id}>
                                        <td className="project-name-cell">
                                            {project.projectName}
                                        </td>
                                        <td>{project.companyName}</td>
                                        <td>{project.contactPerson}</td>
                                        <td>{project.email}</td>
                                        <td>{project.phone || "—"}</td>
                                        <td>
                                            {project.createdAt
                                                ? new Date(project.createdAt).toLocaleDateString("en-IN")
                                                : "—"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="projects-no-data">
                                        {searchTerm
                                            ? "No projects match your search."
                                            : "No projects added yet."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
