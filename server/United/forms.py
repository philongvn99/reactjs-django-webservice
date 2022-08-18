from django import forms
from django.contrib.postgres.forms import SimpleArrayField
from django.core.validators import RegexValidator


loginValidator = [
    RegexValidator(
        r"^[a-zA-Z0-9]{16,32}$",
        message="Input must be Alphanumeric with maximum length 31",
    ),
]

phoneValidator = [
    RegexValidator(
        r"^\+84\d{9}$",
        message=("Phone number format: 9 digits following +84 (VIE)"),
    )
]

nameValidator = [
    RegexValidator(
        r"^[a-zA-Z]{2,}( [a-zA-Z]+)*$",
        message=("Phone number format: 9 digits following +84 (VIE)"),
    )
]


class LoginInfoForm(forms.Form):
    username = forms.CharField(min_length=8, max_length=32, validators=loginValidator)
    password = forms.CharField(min_length=8, max_length=32, validators=loginValidator)


class PlayerInfoForm(forms.Form):
    ROLES = [
        ("G", "GOALKEEPERS"),
        ("D", "DEFENDER"),
        ("M", "MIDFIELDER"),
        ("F", "FORWARD"),
    ]
    STATUSES = [
        ("A", "ACTIVE"),
        ("L", "LOAN"),
        ("M", "LEFT"),
    ]
    name = forms.CharField(min_length=8, max_length=50, validators=nameValidator)
    nationality = forms.CharField(min_length=8, max_length=24, validators=nameValidator)
    birthday = forms.DateField()
    role = forms.ChoiceField(choices=ROLES)
    height = forms.IntegerField()
    number = forms.IntegerField()
    salary = forms.IntegerField(initial=0)
    status = forms.ChoiceField(choices=STATUSES)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class UserInfoForm(forms.Form):
    ROLES = [
        ("A", "Admin"),
        ("S", "Supporter"),
        ("U", "User"),
        ("G", "Guest"),
    ]

    def is_privileged(self):
        return self.role in {"A", "S"}

    def is_visible(self):
        return self.role in {"A", "S", "U"}

    username = forms.CharField(min_length=8, max_length=32, validators=loginValidator)
    password = forms.CharField(min_length=8, max_length=32, validators=loginValidator)
    phone = forms.CharField(min_length=8, max_length=40, validators=phoneValidator)
    name = forms.CharField(min_length=8, max_length=40, validators=nameValidator)
    email = forms.CharField(min_length=8, max_length=40)
    license = forms.CharField(initial="00Z0-00000", min_length=8, max_length=10)
    role = forms.ChoiceField(choices=ROLES, initial="U")


class MatchResultListForm(forms.Form):
    id = SimpleArrayField(forms.IntegerField())
    goalscore = SimpleArrayField(forms.IntegerField())
    goalconceeded = SimpleArrayField(forms.IntegerField())


class MatchResultForm(forms.Form):
    goalscore = forms.IntegerField(required=True)
    goalconceded = forms.IntegerField(required=True)
    hometeam = forms.CharField(min_length=8, max_length=20)
    awayteam = forms.CharField(min_length=8, max_length=20)
    home_goalscorer = forms.CharField(min_length=8, max_length=20)
    away_goalscorer = forms.CharField(min_length=8, max_length=20)
    home_yellowcard = forms.CharField(min_length=8, max_length=20)
    home_redcard = forms.CharField(min_length=8, max_length=20)
    league = forms.CharField(min_length=8, max_length=20)
