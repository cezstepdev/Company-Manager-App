import React, {Component} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ProductService} from './service/ProductService';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {InputTextarea} from 'primereact/inputtextarea';
import {RadioButton} from 'primereact/radiobutton';
import {Mention} from 'primereact/mention';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import './DataTableDemo.css';
import TaskDetails from "./task-details/TaskDetails";
import axios from "axios";

export class DataTableCrudDemo extends Component {

    emptyProduct = {
        id: null,
        username: '',
        taskDescription: '',
        taskStatus: 'waiting',
        createDate: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            products: null,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: this.emptyProduct,
            selectedProducts: null,
            submitted: false,
            globalFilter: null,
            expandedRows: null,
            suggestions: [],
            customers: []
        };

        this.productService = new ProductService();
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/task/all', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGFtIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiY291cnNlOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6ImNvdXJzZTp3cml0ZSJ9XSwiaWF0IjoxNjM1ODg0NTMzLCJleHAiOjE2MzcwMTcyMDB9.LjCWddu_g7wHknD8_oelkoEZv8UGHJ1EojCQmlZgtKE'
            }
        }).then(
            res => {
                this.setState({products: res.data})
            }
        );
    }

    openNew() {
        this.setState({
            product: this.emptyProduct,
            submitted: false,
            productDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
        });
    }

    hideDeleteProductDialog() {
        this.setState({deleteProductDialog: false});
    }

    hideDeleteProductsDialog() {
        this.setState({deleteProductsDialog: false});
    }

    saveProduct() {
        let state = {submitted: true};

        if (this.state.product.username.trim()) {
            let products = [...this.state.products];
            let product = {...this.state.product};
            if (this.state.product.id) {
                const index = this.findIndexById(this.state.product.id);

                let data = {
                    id: product.id,
                    username: product.username,
                    title: product.title,
                    taskDescription: product.taskDescription,
                    complexity: product.complexity,
                    taskStatus: product.taskStatus
                };

                axios.patch('http://localhost:8080/api/v1/task', data, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGFtIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiY291cnNlOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6ImNvdXJzZTp3cml0ZSJ9XSwiaWF0IjoxNjM1ODg0NTMzLCJleHAiOjE2MzcwMTcyMDB9.LjCWddu_g7wHknD8_oelkoEZv8UGHJ1EojCQmlZgtKE'
                    }
                }).then(
                    res => {
                        product.username = res.data.username;
                        product.title = res.data.title;
                        product.taskDescription = res.data.taskDescription;
                        product.complexity = res.data.complexity;

                        products[index] = product;
                        this.toast.show({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});

                        state = {
                            ...state,
                            products,
                            productDialog: false,
                            product: this.emptyProduct
                        };
                        this.setState(state);
                    }
                ).catch(
                    reason => {
                        console.log(reason);
                    }
                );
            } else {
                let data = {
                    username: product.username,
                    title: product.title,
                    taskDescription: product.taskDescription,
                    complexity: product.complexity
                };

                axios.post('http://localhost:8080/api/v1/task', data, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGFtIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiY291cnNlOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6ImNvdXJzZTp3cml0ZSJ9XSwiaWF0IjoxNjM1ODg0NTMzLCJleHAiOjE2MzcwMTcyMDB9.LjCWddu_g7wHknD8_oelkoEZv8UGHJ1EojCQmlZgtKE'
                    }
                }).then(
                    res => {
                        product.id = res.data.id;
                        product.dueDate = res.data.dueDate;
                        product.taskStatus = res.data.taskStatus;
                        this.toast.show({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});

                        state = {
                            ...state,
                            products,
                            productDialog: false,
                            product: this.emptyProduct
                        };
                        this.setState(state);
                    }
                );
            }
        }
    }

    editProduct(product) {
        this.setState({
            product: {...product},
            productDialog: true
        });
    }

    confirmDeleteProduct(product) {
        this.setState({
            product,
            deleteProductDialog: true
        });
    }

    deleteProduct() {
        let products = this.state.products.filter(val => val.id !== this.state.product.id);
        this.setState({
            products,
            deleteProductDialog: false,
            product: this.emptyProduct
        });

        axios.delete('http://localhost:8080/api/v1/task/' + this.state.product.id, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGFtIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiY291cnNlOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6ImNvdXJzZTp3cml0ZSJ9XSwiaWF0IjoxNjM1ODg0NTMzLCJleHAiOjE2MzcwMTcyMDB9.LjCWddu_g7wHknD8_oelkoEZv8UGHJ1EojCQmlZgtKE'
            }
        }).then(r => console.log(r)).catch(reason => console.log(reason));
        this.toast.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({deleteProductsDialog: true});
    }

    deleteSelectedProducts() {
        let products = this.state.products.filter(val => !this.state.selectedProducts.includes(val));
        this.setState({
            products,
            deleteProductsDialog: false,
            selectedProducts: null
        });
        this.toast.show({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    }

    onCategoryChange(e) {
        let product = {...this.state.product};
        product['complexity'] = e.value;
        this.setState({product});
    }

    onInputChange(e, username) {
        let tmp;
        const val = (e.target && e.target.value) || '';

        if (username === "username") {
            tmp = val.substring(1);
        } else {
            tmp = val;
        }

        let product = {...this.state.product};
        product[`${username}`] = tmp;

        this.setState({product});
    }

    onInputNumberChange(e, username) {
        const val = e.value || 0;
        let product = {...this.state.product};
        product[`${username}`] = val;

        this.setState({product});
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew}/>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV}/>
            </React.Fragment>
        )
    }

    statusBodyTemplate(rowData) {
        return <span className={`product-badge status-${rowData.taskStatus.toLowerCase()}`}>{rowData.taskStatus}</span>;
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => this.editProduct(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => this.confirmDeleteProduct(rowData)}/>
            </React.Fragment>
        );
    }

    rowExpansionTemplate(data) {
        return (
            <div className="orders-subtable">
                <h5>{data.title} details</h5>
                <TaskDetails task={data}/>
            </div>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="p-mx-0 p-my-1">Manage Products</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})}
                               placeholder="Search..."/>
                </span>
                <Toolbar right={this.rightToolbarTemplate}/>
            </div>
        );

        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog}/>
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct}/>
            </React.Fragment>
        );

        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog}/>
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct}/>
            </React.Fragment>
        );

        const getUsers = () => {
            axios.get('http://localhost:8080/test/all', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGFtIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiY291cnNlOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6ImNvdXJzZTp3cml0ZSJ9XSwiaWF0IjoxNjM1ODg0NTMzLCJleHAiOjE2MzcwMTcyMDB9.LjCWddu_g7wHknD8_oelkoEZv8UGHJ1EojCQmlZgtKE'
                }
            }).then(
                res => {
                    this.setState({customers: res.data})
                }
            );
        }

        const onSearch = (event) => {
            getUsers();
            let customers = this.state.customers;
            setTimeout(() => {
                const query = event.query;
                let suggestions;

                if (!query.trim().length) {
                    suggestions = [...customers];
                } else {
                    suggestions = customers.filter((customer) => {
                        return customer.username.toLowerCase().startsWith(query.toLowerCase());
                    });
                }

                this.setState({suggestions: suggestions});
            }, 250);
        }

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el}/>

                <div className="card">
                    <DataTable ref={(el) => this.dt = el} value={this.state.products}
                               selection={this.state.selectedProducts}
                               onSelectionChange={(e) => this.setState({selectedProducts: e.value})}
                               dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                               globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll"
                               expandedRows={this.state.expandedRows}
                               onRowToggle={(e) => this.setState({expandedRows: e.data})}
                               onRowExpand={this.onRowExpand} onRowCollapse={this.onRowCollapse}
                               rowExpansionTemplate={this.rowExpansionTemplate}>
                        <Column expander style={{width: '3em'}}/>
                        <Column field="username" header="User" sortable style={{minWidth: '16rem'}}/>
                        <Column field="title" header="Title" sortable style={{minWidth: '10rem'}}/>
                        <Column field="dueDate" header="Due Date" sortable style={{minWidth: '10rem'}}/>
                        <Column field="taskStatus" header="Status" body={this.statusBodyTemplate} sortable
                                style={{minWidth: '12rem'}}/>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{minWidth: '8rem'}}/>
                    </DataTable>
                </div>

                <Dialog visible={this.state.productDialog} style={{width: '450px'}} header="Product Details" modal
                        className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="username">Users</label>
                        <Mention suggestions={this.state.suggestions} onSearch={onSearch} field="username"
                                 onChange={(e) => this.onInputChange(e, 'username')}
                                 placeholder="Please enter @ to mention people" required autoFocus
                                 className={classNames({'p-invalid': this.state.submitted && !this.state.product.username})}/>
                        {this.state.submitted && !this.state.product.username &&
                        <small className="p-error">Name is required.</small>}
                    </div>

                    <div className="p-field">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" value={this.state.product.title} onChange={(e) => this.onInputChange(e, 'title')}
                                   className={classNames({ 'p-invalid': this.state.submitted && !this.state.product.title })} />
                        {this.state.submitted && !this.state.product.title && <small className="p-error">Title is required.</small>}
                    </div>

                    <div className="p-field">
                        <label htmlFor="taskDescription">Description</label>
                        <InputTextarea id="taskDescription" value={this.state.product.taskDescription}
                                       onChange={(e) => this.onInputChange(e, 'taskDescription')} required rows={3}
                                       cols={20}/>
                    </div>

                    <div className="p-field">
                        <label className="p-mb-3">Complexity</label>
                        <div className="complexity">
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton className="complexity-button" inputId="category1" name="category" value="1"
                                             onChange={this.onCategoryChange}
                                             checked={this.state.product.complexity === '1'}/>
                                <label htmlFor="category1">1</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton className="complexity-button" inputId="category2" name="category" value="2"
                                             onChange={this.onCategoryChange}
                                             checked={this.state.product.complexity === '2'}/>
                                <label htmlFor="category2">2</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton className="complexity-button" inputId="category3" name="category" value="3"
                                             onChange={this.onCategoryChange}
                                             checked={this.state.product.complexity === '3'}/>
                                <label htmlFor="category3">3</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton className="complexity-button" inputId="category4" name="category" value="4"
                                             onChange={this.onCategoryChange}
                                             checked={this.state.product.complexity === '4'}/>
                                <label htmlFor="category4">4</label>
                            </div>
                        </div>
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductDialog} style={{width: '450px'}} header="Confirm" modal
                        footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                        {this.state.product &&
                        <span>Are you sure you want to delete <b>{this.state.product.title}</b>?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}