const notesCtrl = {}; const Note = require('../models/Note');
//FormViewAdd
notesCtrl.renderNotesForm = (req,res) => {
    res.render('notas/newNota');
};
//FormRunAdd
notesCtrl.createNoteAdd = async (req,res) =>{
    const {title,description} = req.body;
    const nNote = new Note({title, description}); 
    await nNote.save();
    console.log(nNote);
    req.flash('success_msg', 'Nota Añadida Exitosamente Humano'); res.redirect('/notas');
}
//FormViewList
notesCtrl.renderNotes = async (req,res) => {
    const fNote = await Note.find();
    res.render('notas/viewAllNote' , {fNote});
};
//FormViewUpdate
notesCtrl.renderNoteEdit = async (req,res) => {
    const aNote = await Note.findById(req.params.id);
    res.render('notas/editNota', {aNote});
};
//FormRunUpdate
notesCtrl.createNoteUpdate =async (req,res) => {
    const {title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,description});
    console.log(req.body); req.flash('success_msg', 'Nota Actualizada Humano');
    res.redirect('/notas');
};
//FormDelete
notesCtrl.renderNoteDelete = async (req,res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Nota Eliminada Humano Culey')
    res.redirect('/notas');
};


module.exports = notesCtrl;