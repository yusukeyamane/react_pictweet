json.data(@tweets) { |d| json.extract!(d, :text, :user) }
