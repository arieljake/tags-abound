
/*
 * Example:
 * exports.index = function(req, res){
 * res.render('index', { title: 'Express' })
 * };
 */

exports.index = function(req, res){
  res.render('index', {title: "Listly"});
};
