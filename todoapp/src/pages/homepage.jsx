import React, { Component } from 'react';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

class Homepage extends Component {
	state = {
		data: [],
		modalAddOpen: false,
		modalEditOpen: false,
		indexEdit: -1
	};

	// Component did mount
	componentDidMount = () => {
		this.setState({
			data: [
				{
					kegiatan: 'Lari',
					status: 'Sudah',
					tanggal: '2019-11-25'
				},
				{
					kegiatan: 'Sarapan',
					status: 'Belum',
					tanggal: '2019-11-26'
				}
			]
		});
	};

	// Function edit change
	editChange = e => {
		this.setState({ status: e.target.value });
	};

	// Function tampilkan data
	renderTodo = () => {
		return this.state.data.map((val, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{val.tanggal}</td>
					<td>{val.kegiatan}</td>
					<td>{val.status}</td>
					<td>
						<button
							className='btn btn-sm btn-warning'
							onClick={() => this.btnEdit(index)}>
							Edit
						</button>
						<button
							className='btn btn-sm btn-danger ml-1'
							onClick={() => this.btnDelete(index)}>
							Delete
						</button>
					</td>
				</tr>
			);
		});
	};

	// Function modal edit
	renderEdit = () => {
		return this.state.data.map((val, index) => {
			if (this.state.indexEdit === index) {
				return (
					<div key={index}>
						<Modal
							isOpen={this.state.modalEditOpen}
							toggle={() => this.setState({ modalEditOpen: false })}>
							<ModalHeader>Edit Data</ModalHeader>
							<ModalBody>
								<div className='form-group'>
									<label htmlFor='kegiatan'>Kegiatan</label>
									<input
										type='text'
										ref='kegiatan'
										className='form-control'
										defaultValue={val.kegiatan}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='tanggal'>Tanggal</label>
									<input
										type='date'
										ref='tanggal'
										className='form-control'
										defaultValue={val.tanggal}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='status'>Status</label>
									<select
										className='form-control'
										ref='status'
										defaultValue={val.status}>
										<option value='Belum'>Belum</option>
										<option value='Sudah'>Sudah</option>
									</select>
								</div>
							</ModalBody>
							<ModalFooter>
								<button className='btn btn-sm btn-primary' onClick={this.btnUpdate}>
									Edit
								</button>
								<button
									className='btn btn-sm btn-secondary'
									onClick={() => this.setState({ modalEditOpen: false })}>
									Cancel
								</button>
							</ModalFooter>
						</Modal>
					</div>
				);
			}
		});
	};

	// Function button tambah data
	btnAdd = () => {
		let kegiatan = this.refs.kegiatan.value;
		let tanggal = this.refs.tanggal.value;
		let obj = {
			kegiatan,
			status: 'Belum',
			tanggal
		};

		if (kegiatan === '' || tanggal === '') {
			MySwal.fire('Cancelled', 'Data tidak boleh kosong!', 'error');
		} else {
			let newData = [...this.state.data, obj];
			this.setState({ data: newData, modalAddOpen: false });
			MySwal.fire('Success', 'Data berhasil di tambah!', 'success');
		}
	};

	// Function button edit data
	btnEdit = index => {
		this.setState({ indexEdit: index, modalEditOpen: true });
	};

	// Function button update data
	btnUpdate = index => {
		let kegiatan = this.refs.kegiatan.value;
		let status = this.refs.status.value;
		let tanggal = this.refs.tanggal.value;
		let obj = {
			kegiatan,
			status,
			tanggal
		};

		if (kegiatan === '' || tanggal === '' || status === '') {
			MySwal.fire('Cancelled', 'Data tidak boleh kosong!', 'error');
		} else {
			MySwal.fire({
				title: `Apa kamu yakin update data ini?`,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Update',
				cancelButtonText: 'Tidak',
				reverseButtons: true
			}).then(result => {
				if (result.value) {
					let data = this.state.data;
					data.splice([this.state.indexEdit], 1, obj);
					this.setState({ data, modalEditOpen: false });
					MySwal.fire('Success', 'Data berhasil di update!', 'success');
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					MySwal.fire('Cancelled', 'Data tidak gagal di update!', 'error');
				}
			});
		}
	};

	// Function button delete data
	btnDelete = index => {
		MySwal.fire({
			title: `Apa kamu yakin hapus ${this.state.data[index].kegiatan}?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Hapus',
			cancelButtonText: 'Tidak',
			reverseButtons: true
		}).then(result => {
			if (result.value) {
				let data = this.state.data;
				data.splice(index, 1);
				this.setState({ data });
				MySwal.fire('Deleted!', 'Data berhasil di hapus!.', 'success');
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				MySwal.fire('Cancelled', 'Data tidak jadi di hapus!', 'error');
			}
		});
	};

	render() {
		return (
			<div className='mx-5 my-5'>
				<div>
					<button
						className='btn btn-sm btn-success rounded mb-5'
						onClick={() => this.setState({ modalAddOpen: true })}>
						Tambah Data
					</button>
				</div>

				<div>{this.renderEdit()}</div>

				<div>
					<Modal
						isOpen={this.state.modalAddOpen}
						toggle={() => this.setState({ modalAddOpen: false })}>
						<ModalHeader>Add Data</ModalHeader>
						<ModalBody>
							<div className='form-group'>
								<label htmlFor='kegiatan'>Kegiatan</label>
								<input type='text' ref='kegiatan' className='form-control' />
							</div>
							<div className='form-group'>
								<label htmlFor='tanggal'>Tanggal</label>
								<input type='date' ref='tanggal' className='form-control' />
							</div>
						</ModalBody>
						<ModalFooter>
							<button className='btn btn-sm btn-primary' onClick={this.btnAdd}>
								Add
							</button>
							<button
								className='btn btn-sm btn-secondary'
								onClick={() => this.setState({ modalAddOpen: false })}>
								Cancel
							</button>
						</ModalFooter>
					</Modal>
				</div>

				<Table striped style={{ textAlign: 'center' }}>
					<thead>
						<tr>
							<th>No</th>
							<th>Tanggal</th>
							<th>Kegiatan</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.renderTodo()}</tbody>
				</Table>
			</div>
		);
	}
}

export default Homepage;